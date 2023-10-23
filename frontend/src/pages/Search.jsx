import React from "react";

function Search() {
	return (
		<div className="flex flex-col md:flex-row">
			<div className="left-site p-7 border-b-2 md:border-r-2 md:min-h-screen">
				<form className="flex flex-col gap-8">
					<div className="left-site__search">
						<label className="flex flex-col gap-2" htmlFor="searchTerm">
							<span className="font-semibold">Search Term:</span>
							<input type="text" id="searchTerm" placeholder="Search..." className="border rounded-lg p-2 w-full" />
						</label>
					</div>
					<div className="flex gap-2 flex-wrap items-center">
						<label className="font-semibold" htmlFor="">
							Type:
						</label>
						<div className="flex gap-2">
							<label htmlFor="all">
								<input type="checkbox" id="all" className="w-5" />
								<span>Rent & Sale</span>
							</label>
						</div>
						<div className="flex gap-2">
							<label htmlFor="rent">
								<input type="checkbox" id="rent" className="w-5" />
								<span>Rent</span>
							</label>
						</div>
						<div className="flex gap-2">
							<label htmlFor="sale">
								<input type="checkbox" id="sale" className="w-5" />
								<span>Sale</span>
							</label>
						</div>
						<div className="flex gap-2">
							<label htmlFor="offer">
								<input type="checkbox" id="offer" className="w-5" />
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
								<input type="checkbox" id="parking" className="w-5" />
								<span>Parking</span>
							</label>
						</div>
						<div className="flex gap-2">
							<label htmlFor="furnished">
								<input type="checkbox" id="furnished" className="w-5" />
								<span>Furnished</span>
							</label>
						</div>
					</div>
					{/* END: Amenities */}
					<div className="flex items-center gap-2">
						<label htmlFor="">Sort:</label>
						<select name="" id="sort_order" className="border rounded-lg p-2">
							<option value="">Price high to low</option>
							<option value="">Price low to high</option>
							<option value="">Latest</option>
							<option value="">Oldest</option>
						</select>
					</div>
					{/* END: Sort */}
					<button className="bg-cyan-700 text-white font-semibold p-3 rounded-lg uppercase hover:opacity-95">Search</button>
				</form>
			</div>
			{/* END: .left-site */}
			<div className="right-site">
				<h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5 text-center">Listing results:</h1>
			</div>
			{/* END: .right-site */}
		</div>
	);
}

export default Search;
