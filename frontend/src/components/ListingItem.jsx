import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import noImageEstate from "../assets/Images/151-1512476_real-estate-images-h.png";
function ListingItem({ listing }) {
	return (
		<div className="w-full md:w-[300px] bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg">
			<Link to={`/listing/${listing._id}`}>
				<img src={listing.imageUrls[0] || noImageEstate} alt={listing.name} className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" />
				<div className="p-3 flex flex-col gap-2 w-full">
					<p className="truncate text-lg font-semibold text-slate-700">{listing.name}</p>
					<div className="flex items-center gap-1">
						<MdLocationOn className="h-4 w-4 text-green-700" />
						<p className="text-sm text-gray-600 truncate w-full">{listing.address}</p>
					</div>
					<p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
					<p className="text-slate-500 mt-2 font-semibold">
						$ {listing.offer ? listing.discountPrice.toLocaleString("en-US") : listing.regularPrice.toLocaleString("en-US")} {listing.type === "rent" && "/ month"}
					</p>
					<div className="flex gap-3 text-slate-700">
						<div className="font-bold text-xs">{listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}</div>
						<div className="font-bold text-xs">{listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}</div>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default ListingItem;
