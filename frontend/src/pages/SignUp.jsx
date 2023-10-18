import clsx from "clsx";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
	const [formData, setFormData] = useState({});
	const [error, setError] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const res = await fetch(`/api/v1/auth/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			if (data.success === false) {
				setError(data.message);
				setLoading(false);
				return;
			}
			setLoading(false);
			setError(null);
			navigate("/sign-in");
		} catch (error) {
			setLoading(false);
			setError(error.message);
		}
	};

	console.log(">>>formData: ", formData);
	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
			{error && (
				<div class={clsx(`${error ? "bg-red-100 border-red-400 text-red-700" : "bg-green-100 border-green-400 text-green-700"} border px-4 py-3 rounded relative mb-3`)} role="alert">
					<strong class="font-bold">Error:</strong>
					<span class="block sm:inline">{error}</span>
					<span class="absolute top-0 bottom-0 right-0 px-4 py-3">
						<svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
							<title>Close</title>
							<path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
						</svg>
					</span>
				</div>
			)}
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<input type="text" placeholder="Username" className="border p-3 rounded-lg focus:outline-none" id="username" name="username" onChange={handleChange} />
				<input type="email" placeholder="Email" className="border p-3 rounded-lg focus:outline-none" id="email" name="email" onChange={handleChange} />
				<input type="password" placeholder="Password" className="border p-3 rounded-lg focus:outline-none" id="password" name="password" onChange={handleChange} />
				<button disabled={isLoading} type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
					{isLoading ? "Loading..." : "Sign up"}
				</button>
			</form>
			<div className="flex gap-2 mt-5">
				<p>Have an account?</p>
				<Link to={"/sign-in"}>
					<span className="text-blue-700">Signin</span>
				</Link>
			</div>
		</div>
	);
}

export default SignUp;
