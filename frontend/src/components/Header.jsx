import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Header() {
	const { currentUser } = useSelector((state) => state.user);
	const [searchTerm, setSearchTerm] = useState("");

	const navigate = useNavigate();

	const handleSearch = async (e) => {
		e.preventDefault();
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set("searchTerm", searchTerm);
		const searchQuery = urlParams.toString();

		navigate(`/search?${searchQuery}`);
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const searchTermFromUrl = urlParams.get("searchTerm");
		if (searchTermFromUrl) {
			setSearchTerm(searchTermFromUrl);
		}
	}, [location.search]);

	return (
		<header className="bg-slate-200 shadow-md">
			<div className="flex justify-between items-center max-w-6xl mx-auto p-3">
				<Link to="/">
					<h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
						<span className="text-red-700">Novo</span>
						<span className="text-orange-500">land</span>
					</h1>
				</Link>
				<form onSubmit={handleSearch} className="bg-slate-100 p-3 rounded-lg flex items-center">
					<input
						type="text"
						className="bg-transparent focus:outline-none w-24 sm:w-64"
						placeholder="Search..."
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
						}}
					/>
					<button type="submit">
						<FaSearch className="text-slate-600" />
					</button>
				</form>
				<ul className="flex gap-4">
					<li className="hidden sm:inline text-slate-700 hover:underline">
						<Link to="/">Home</Link>
					</li>
					<li className="hidden sm:inline text-slate-700 hover:underline">
						<Link to="/about">About</Link>
					</li>
					{currentUser ? (
						<Link to="/profile">
							<img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" />
						</Link>
					) : (
						<li className=" text-slate-700 hover:underline">
							<Link to="/sign-in">Sign in</Link>
						</li>
					)}
				</ul>
			</div>
		</header>
	);
}

export default Header;
