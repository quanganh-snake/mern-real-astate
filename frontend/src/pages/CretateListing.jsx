import React from "react";

function CretateListing() {
	return (
		<main className="p-3 max-w-4xl mx-auto">
			<h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>
			<form className="flex flex-col sm:flex-row gap-4">
				<div className="flex flex-col gap-4 flex-1">
					<input type="text" placeholder="Name..." className="border outline-cyan-700 p-3 rounded-lg" id="name" maxLength={"62"} minLength={"10"} required />
					<textarea type="text" placeholder="Description..." className="border outline-cyan-700 p-3 rounded-lg" id="description" required />
					<input type="text" placeholder="Address..." className="border outline-cyan-700 p-3 rounded-lg" id="address" required />
					<div className=" flex gap-6 flex-wrap">
						<label htmlFor="sale" className="flex gap-1 items-center">
							<input type="checkbox" className="w-5" name="recent" id="sell" />
							<span>Sell</span>
						</label>
						<label htmlFor="sale" className="flex gap-1 items-center">
							<input type="checkbox" className="w-5" name="recent" id="rent" />
							<span>Rent</span>
						</label>
						<label htmlFor="sale" className="flex gap-1 items-center">
							<input type="checkbox" className="w-5" name="recent" id="paking" />
							<span>Parking spot</span>
						</label>
						<label htmlFor="sale" className="flex gap-1 items-center">
							<input type="checkbox" className="w-5" name="recent" id="furnished" />
							<span>Furnished</span>
						</label>
						<label htmlFor="sale" className="flex gap-1 items-center">
							<input type="checkbox" className="w-5" name="recent" id="offer" />
							<span>Offer</span>
						</label>
					</div>
					<div className="flex flex-wrap gap-8">
						<label htmlFor="bedrooms" className="flex gap-2 items-center">
							<input type="number" className="p-2 border border-gray-300 rounded-lg" min="1" max="10" id="bedrooms" />
							<span>Beds</span>
						</label>
						<label htmlFor="bathrooms" className="flex gap-2 items-center">
							<input type="number" className="p-2 border border-gray-300 rounded-lg" min="1" max="10" id="bathrooms" />
							<span>Baths</span>
						</label>
						<label htmlFor="regularPrice" className="flex gap-2 items-center">
							<input type="number" className="p-2 border border-gray-300 rounded-lg" min="1" max="10" id="regularPrice" />
							<div className="flex flex-col items-center">
								<p>Regular price</p>
								<small>($/Month)</small>
							</div>
						</label>
						<label htmlFor="discountPrice" className="flex gap-2 items-center">
							<input type="number" className="p-2 border border-gray-300 rounded-lg" min="1" max="10" id="discountPrice" />
							<div className="flex flex-col items-center">
								<p>Discounteed price</p>
								<small>($/Month)</small>
							</div>
						</label>
					</div>
				</div>

				<div className="flex flex-col flex-1 gap-4">
					<p className="font-semibold">
						Images: <span className="font-normal text-gray-600 ml-2">The first image will be the cover (max 6)</span>
					</p>
					<div className="flex gap-4">
						<input type="file" className="py-1 px-2 border border-gray-300 rounded w-full" id="images" accept="image/*" multiple />
						<button className="py-1 px-2 text-green-700 border border-green-700 rounded-md uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
					</div>
					<button className="py-1 px-3 bg-slate-700 text-white rounded-md uppercase hover:opacity-90 disabled:opacity-90">Create Listing</button>
				</div>
			</form>
		</main>
	);
}

export default CretateListing;
