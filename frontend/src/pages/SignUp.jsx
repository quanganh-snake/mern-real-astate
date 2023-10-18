import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
			<form className="flex flex-col gap-4" action="">
				<input type="text" placeholder="Username" className="border p-3 rounded-lg focus:outline-none" id="username" name="username" />
				<input type="email" placeholder="Email" className="border p-3 rounded-lg focus:outline-none" id="email" name="email" />
				<input type="password" placeholder="Password" className="border p-3 rounded-lg focus:outline-none" id="password" name="password" />
				<button type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
					Sign up
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
