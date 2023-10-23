import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

function Search() {
	const navigate = useNavigate();

	const [sidebarData, setSidebarData] = useState({
		searchTerm: "",
		type: "all",
		parking: false,
		furnished: false,
		offer: false,
		sort: "created_at",
		order: "desc",
	});

	const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		if (e.target.id === "all" || e.target.id === "rent" || e.target.id === "sale") {
			setSidebarData({
				...sidebarData,
				type: e.target.id,
			});
		}

		if (e.target.id === "searchTerm") {
			setSidebarData({
				...sidebarData,
				searchTerm: e.target.value,
			});
		}

		if (e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
			setSidebarData({
				...sidebarData,
				[e.target.id]: e.target.checked || e.target.checked === "true" ? true : false,
			});
		}

		if (e.target.id === "sort_order") {
			const sort = e.target.value.split("_")[0] || "created_at";
			const order = e.target.value.split("_")[1] || "desc";

			setSidebarData({
				...sidebarData,
				sort,
				order,
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const urlParams = new URLSearchParams();
		urlParams.set("searchTerm", sidebarData.searchTerm);
		urlParams.set("type", sidebarData.type);
		urlParams.set("parking", sidebarData.parking);
		urlParams.set("furnished", sidebarData.furnished);
		urlParams.set("offer", sidebarData.offer);
		urlParams.set("sort", sidebarData.sort);
		urlParams.set("order", sidebarData.order);

		const searchQuery = urlParams.toString();
		navigate(`/search?${searchQuery}`);
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const searchTermFromUrl = urlParams.get("searchTerm");
		const typeFromUrl = urlParams.get("type");
		const parkingFromUrl = urlParams.get("parking");
		const furnishedFromUrl = urlParams.get("furnished");
		const offerFromUrl = urlParams.get("offer");
		const sortFromUrl = urlParams.get("sort");
		const orderFormUrl = urlParams.get("order");

		if (searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFormUrl) {
			setSidebarData({
				searchTerm: searchTermFromUrl || "",
				type: typeFromUrl || "all",
				parking: parkingFromUrl === "true" ? true : false,
				furnished: furnishedFromUrl === "true" ? true : false,
				offer: offerFromUrl === "true" ? true : false,
				sort: sortFromUrl || "created_at",
				order: orderFormUrl || "desc",
			});
		}

		const fetchingListings = async () => {
			setLoading(true);
			const searchQuery = urlParams.toString();
			const res = await fetch(`/api/v1/listing/get?${searchQuery}`);
			const data = await res.json();
			setListings(data);
			setLoading(false);
		};

		fetchingListings();
	}, [location.search]);

	console.log(listings);

	return (
		<div className="flex flex-col md:flex-row">
			<div className="left-site p-7 border-b-2 md:border-r-2 md:min-h-screen">
				<form onSubmit={handleSubmit} className="flex flex-col gap-8">
					<div className="left-site__search">
						<label className="flex flex-col gap-2" htmlFor="searchTerm">
							<span className="font-semibold">Search Term:</span>
							<input type="text" id="searchTerm" placeholder="Search..." className="border rounded-lg p-2 w-full" value={sidebarData.searchTerm} onChange={handleChange} />
						</label>
					</div>
					<div className="flex gap-2 flex-wrap items-center">
						<label className="font-semibold" htmlFor="">
							Type:
						</label>
						<div className="flex gap-2">
							<label htmlFor="all">
								<input type="checkbox" id="all" className="w-5" onChange={handleChange} checked={sidebarData.type === "all"} />
								<span>Rent & Sale</span>
							</label>
						</div>
						<div className="flex gap-2">
							<label htmlFor="rent">
								<input type="checkbox" id="rent" className="w-5" onChange={handleChange} checked={sidebarData.type === "rent"} />
								<span>Rent</span>
							</label>
						</div>
						<div className="flex gap-2">
							<label htmlFor="sale">
								<input type="checkbox" id="sale" className="w-5" onChange={handleChange} checked={sidebarData.type === "sale"} />
								<span>Sale</span>
							</label>
						</div>
						<div className="flex gap-2">
							<label htmlFor="offer">
								<input type="checkbox" id="offer" className="w-5" onChange={handleChange} checked={sidebarData.offer} />
								<span>Offer</span>
							</label>
						</div>
					</div>
					{/* END: Types */}
					<div className="flex gap-2 flex-wrap items-center">
						<label className="font-semibold" htmlFor="">
							Amenities:
						</label>
						<div className="flex gap-2">
							<label htmlFor="parking">
								<input type="checkbox" id="parking" className="w-5" onChange={handleChange} checked={sidebarData.parking} />
								<span>Parking</span>
							</label>
						</div>
						<div className="flex gap-2">
							<label htmlFor="furnished">
								<input type="checkbox" id="furnished" className="w-5" onChange={handleChange} checked={sidebarData.furnished} />
								<span>Furnished</span>
							</label>
						</div>
					</div>
					{/* END: Amenities */}
					<div className="flex items-center gap-2">
						<label htmlFor="">Sort:</label>
						<select name="" id="sort_order" className="border rounded-lg p-2" onChange={handleChange} defaultValue={"created_at_desc"}>
							<option value="regularPrice_desc">Price high to low</option>
							<option value="regularPrice_asc">Price low to high</option>
							<option value="createdAt_desc">Latest</option>
							<option value="createdAt_asc">Oldest</option>
						</select>
					</div>
					{/* END: Sort */}
					<button className="bg-cyan-700 text-white font-semibold p-3 rounded-lg uppercase hover:opacity-95">Search</button>
				</form>
			</div>
			{/* END: .left-site */}
			<div className="right-site w-full">
				<h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5 text-center">Listing results:</h1>
				<div className="p-7 flex flex-wrap gap-4">
					{!loading && listings.length === 0 && <p className="text-xl text-center text-slate-700 my-7">No listing found!</p>}
					{loading && <p className="text-xl text-center text-slate-700 my-7">Loading...</p>}
					{!loading && listings && listings.map((listing) => <ListingItem key={listing._id} listing={listing} />)}
				</div>
			</div>
			{/* END: .right-site */}
		</div>
	);
}

export default Search;
