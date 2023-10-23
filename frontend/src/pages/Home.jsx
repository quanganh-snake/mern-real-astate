import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import ListingItem from "./../components/ListingItem";

function Home() {
	const [offerListings, setOfferListings] = useState([]);
	const [saleListings, setSaleListings] = useState([]);
	const [rentListings, setRentListings] = useState([]);

	SwiperCore.use([Navigation]);

	useEffect(() => {
		const fetchOfferListings = async () => {
			try {
				const res = await fetch(`/api/v1/listing/get?offer=true&limit=4`);
				const data = await res.json();
				setOfferListings(data);
				fetchRentListings();
			} catch (error) {
				console.log("🚀 ~ file: Home.jsx:14 ~ getchOfferListings ~ error:", error);
			}
		};

		const fetchRentListings = async () => {
			try {
				const res = await fetch(`/api/v1/listing/get?type=rent&limit=4`);
				const data = await res.json();
				setRentListings(data);
				fetchSaleListings();
			} catch (error) {
				console.log("🚀 ~ file: Home.jsx:26 ~ fetchRentListings ~ error:", error);
			}
		};

		const fetchSaleListings = async () => {
			try {
				const res = await fetch(`/api/v1/listing/get?type=sale&limit=4`);
				const data = await res.json();
				setSaleListings(data);
			} catch (error) {
				console.log("🚀 ~ file: Home.jsx:36 ~ fetchSaleListings ~ error:", error);
			}
		};

		fetchOfferListings();
	}, []);

	return (
		<div>
			{/* Top Side */}
			<div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
				<h1 className="text-slate-700 font-bold text-3xl">
					Find your next <span className="text-slate-500">perfect</span> <br /> place with ease
				</h1>
				<div className="text-gray-400 text-xs sm:text-sm">
					Novoland will help you find home fast, easy and comfortable.
					<br />
					Our expert support are always available.
				</div>
				<Link to={"/search"} className="text-xs sm:text-sm text-blue-800 font-bold hover:underline">
					Let's get started...
				</Link>
			</div>

			{/* Slider */}
			<Swiper navigation>
				<SwiperSlide>
					{offerListings &&
						offerListings.length > 0 &&
						offerListings.map((listing) => (
							<div style={{ background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: "cover" }} className="h-[500px]" key={listing._id}></div>
						))}
				</SwiperSlide>
			</Swiper>
			{/* Listing results for offer, sale and rent*/}
			<div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
				{offerListings && offerListings.length > 0 && (
					<>
						<div className="my-3">
							<h2 className="text-2xl font-semibold text-slate-600">Recent Offers</h2>
							<Link className="text-sm text-cyan-800 hover:underline" to="/search?offer=true">
								Show more offers
							</Link>
						</div>
						<div className="flex flex-wrap gap-4">
							{offerListings.map((listing) => (
								<ListingItem listing={listing} key={listing._id}></ListingItem>
							))}
						</div>
					</>
				)}

				{rentListings && rentListings.length > 0 && (
					<>
						<div className="my-3">
							<h2 className="text-2xl font-semibold text-slate-600">Recent plcae for rent</h2>
							<Link className="text-sm text-cyan-800 hover:underline" to="/search?type=rent">
								Show more places for rents
							</Link>
						</div>
						<div className="flex flex-wrap gap-4">
							{rentListings.map((listing) => (
								<ListingItem listing={listing} key={listing._id}></ListingItem>
							))}
						</div>
					</>
				)}

				{saleListings && saleListings.length > 0 && (
					<>
						<div className="my-3">
							<h2 className="text-2xl font-semibold text-slate-600">Recent places for sale</h2>
							<Link className="text-sm text-cyan-800 hover:underline" to="/search?offer=true">
								Show more places for offers
							</Link>
						</div>
						<div className="flex flex-wrap gap-4">
							{saleListings.map((listing) => (
								<ListingItem listing={listing} key={listing._id}></ListingItem>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Home;
