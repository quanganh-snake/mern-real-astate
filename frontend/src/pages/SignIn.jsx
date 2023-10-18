import clsx from "clsx";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailed } from "../redux/slice/userSlice";
import OAuth from "../components/OAuth";

function SignIn() {
	const [formData, setFormData] = useState({});
	const { loading, error } = useSelector((state) => state?.user);
	const [isOpen, setOpen] = useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(signInStart());
			const res = await fetch(`/api/v1/auth/signin`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();
			console.log("🚀 ~ file: SignIn.jsx:32 ~ handleSubmit ~ data:", data);

			if (data.success === false) {
				dispatch(signInFailed(data.message));
				return;
			}
			dispatch(signInSuccess(data));
			navigate("/");
		} catch (error) {
			dispatch(signInFailed(error.message));
			setOpen(!isOpen);
		}
	};

	const handleCloseAlert = () => {
		setOpen(!isOpen);
	};

	console.log(">>>formData: ", formData);
	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
			{error && (
				<div
					className={clsx(
						`${error ? "bg-red-100 border-red-400 text-red-700" : "bg-green-100 border-green-400 text-green-700"} border px-4 py-3 rounded relative mb-3`,
						isOpen ? "block" : " hidden"
					)}
					role="alert"
				>
					<strong className="font-bold">Error:</strong>
					<span className="block sm:inline">{error}</span>
					<span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={handleCloseAlert}>
						<svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
							<title>Close</title>
							<path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
						</svg>
					</span>
				</div>
			)}
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<input type="email" placeholder="Email" className="border p-3 rounded-lg focus:outline-none" id="email" name="email" onChange={handleChange} />
				<input type="password" placeholder="Password" className="border p-3 rounded-lg focus:outline-none" id="password" name="password" onChange={handleChange} />
				<button disabled={loading} type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
					{loading ? "Loading..." : "Sign in"}
				</button>
				<OAuth />
			</form>
			<div className="flex gap-2 mt-5">
				<p>Don't have an account?</p>
				<Link to={"/sign-up"}>
					<span className="text-blue-700">Sign up</span>
				</Link>
			</div>
		</div>
	);
}

export default SignIn;
