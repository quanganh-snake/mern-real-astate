import React, { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "./../../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function CretateListing() {
	// variables
	const { currentUser } = useSelector((state) => state.user);
	const [files, setFiles] = useState([]);
	const [formData, setFormData] = useState({
		imageUrls: [],
		name: "",
		description: "",
		address: "",
		type: "rent",
		bedrooms: 1,
		bathrooms: 1,
		regularPrice: 0,
		discountPrice: 0,
		offer: false,
		parking: false,
		furnished: false,
	});
	const [imageUploadError, setImageUploadError] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	//event handlers
	const handleUploadImage = (e) => {
		if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
			setUploading(true);
			setImageUploadError(false);
			const promises = [];
			for (let i = 0; i < files.length; i++) {
				promises.push(storageImage(files[i]));
			}
			Promise.all(promises)
				.then((urls) => {
					setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
					setUploading(false);
					setImageUploadError(false);
				})
				.catch((err) => {
					setUploading(false);
					setImageUploadError("Image upload failed (2MB max per image)");
				});
		} else {
			setUploading(false);
			setImageUploadError("You can only upload 6 images");
		}
	};

	const storageImage = async (file) => {
		return new Promise((resolve, reject) => {
			const storage = getStorage(app);
			const fileName = file.name + "_" + new Date().getTime();
			const storageRef = ref(storage, fileName);
			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					// console.log(`Upload is ${progress}% done`);
				},
				(error) => {
					reject(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						resolve(downloadURL);
					});
				}
			);
		});
	};

	const handleDeleteImage = (index) => {
		setFormData({
			...formData,
			imageUrls: formData.imageUrls.filter((_, i) => i !== index),
		});
	};

	const handleChange = (e) => {
		if (e.target.id === "sale" || e.target.id === "rent") {
			setFormData({
				...formData,
				type: e.target.id,
			});
		}
		if (e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
			setFormData({
				...formData,
				[e.target.id]: e.target.checked,
			});
		}

		if (e.target.type === "number" || e.target.type === "text" || e.target.type === "textarea") {
			setFormData({
				...formData,
				[e.target.id]: e.target.value,
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (formData.imageUrls.length < 1) return setError("Youmust upload at least one image");

			if (+formData.regularPrice < +formData.discountPrice) return setError("Discount price must be lower than rengular price");

			setLoading(true);
			setError(false);

			const res = await fetch("/api/v1/listing/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formData,
					userRef: currentUser._id,
				}),
			});
			const data = await res.json();
			setLoading(false);
			if (data.success === false) {
				setError(data.message);
			}
			navigate(`/listing/${data._id}`);
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	};

	return (
		<main className="p-3 max-w-4xl mx-auto">
			<h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>
			<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
				<div className="flex flex-col gap-4 flex-1">
					<input
						onChange={handleChange}
						value={formData.name}
						type="text"
						placeholder="Name..."
						className="border outline-cyan-700 p-3 rounded-lg"
						id="name"
						maxLength={"62"}
						minLength={"10"}
						required
					/>
					<textarea
						onChange={handleChange}
						value={formData.description}
						type="text"
						placeholder="Description..."
						className="border outline-cyan-700 p-3 rounded-lg"
						id="description"
						required
					/>
					<input onChange={handleChange} value={formData.address} type="text" placeholder="Address..." className="border outline-cyan-700 p-3 rounded-lg" id="address" required />
					<div className=" flex gap-6 flex-wrap">
						<label htmlFor="sale" className="flex gap-1 items-center">
							<input onChange={handleChange} checked={formData.type == "sale"} type="checkbox" className="w-5" name="recent" id="sale" />
							<span>Sell</span>
						</label>
						<label htmlFor="rent" className="flex gap-1 items-center">
							<input onChange={handleChange} checked={formData.type == "rent"} type="checkbox" className="w-5" name="recent" id="rent" />
							<span>Rent</span>
						</label>
						<label htmlFor="parking" className="flex gap-1 items-center">
							<input onChange={handleChange} checked={formData.parking} type="checkbox" className="w-5" name="recent" id="parking" />
							<span>Parking spot</span>
						</label>
						<label htmlFor="furnished" className="flex gap-1 items-center">
							<input onChange={handleChange} checked={formData.furnished} type="checkbox" className="w-5" name="recent" id="furnished" />
							<span>Furnished</span>
						</label>
						<label htmlFor="offer" className="flex gap-1 items-center">
							<input onChange={handleChange} checked={formData.offer} type="checkbox" className="w-5" name="recent" id="offer" />
							<span>Offer</span>
						</label>
					</div>
					<div className="flex flex-wrap gap-8">
						<label htmlFor="bedrooms" className="flex gap-2 items-center">
							<input onChange={handleChange} value={formData.bedrooms} type="number" className="p-2 border border-gray-300 rounded-lg" min="1" max="10" id="bedrooms" />
							<span>Beds</span>
						</label>
						<label htmlFor="bathrooms" className="flex gap-2 items-center">
							<input onChange={handleChange} value={formData.bathrooms} type="number" className="p-2 border border-gray-300 rounded-lg" min="1" max="10" id="bathrooms" />
							<span>Baths</span>
						</label>
						<label htmlFor="regularPrice" className="flex gap-2 items-center">
							<input onChange={handleChange} value={formData.regularPrice} type="number" className="p-2 border border-gray-300 rounded-lg" min="1" max="10000000" id="regularPrice" />
							<div className="flex flex-col items-center">
								<p>Regular price</p>
								<small>($/Month)</small>
							</div>
						</label>
						{formData.offer && (
							<label htmlFor="discountPrice" className="flex gap-2 items-center">
								<input
									onChange={handleChange}
									value={formData.discountPrice}
									type="number"
									className="p-2 border border-gray-300 rounded-lg"
									min="0"
									max="10000000"
									id="discountPrice"
								/>
								<div className="flex flex-col items-center">
									<p>Discounteed price</p>
									<small>($/Month)</small>
								</div>
							</label>
						)}
					</div>
				</div>
				{/* END: Left form */}

				<div className="flex flex-col flex-1 gap-4">
					<p className="font-semibold">
						Images: <span className="font-normal text-gray-600 ml-2">The first image will be the cover (max 6)</span>
					</p>
					<div className="flex gap-4">
						<input
							onChange={(e) => {
								setFiles(e.target.files);
							}}
							type="file"
							className="py-1 px-2 border border-gray-300 rounded w-full"
							id="images"
							accept="image/*"
							multiple
						/>
						<button
							type="button"
							disabled={uploading}
							onClick={handleUploadImage}
							className="py-1 px-2 text-green-700 border border-green-700 rounded-md uppercase hover:shadow-lg disabled:opacity-80"
						>
							{uploading ? "Uploading" : "Upload"}
						</button>
					</div>
					<p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
					{formData.imageUrls.length > 0 &&
						formData.imageUrls.map((url, index) => (
							<div className="flex justify-between items-center" key={index}>
								<img src={url} alt="listing image" className="w-20 h-20 rounded-lg shadow-md object-cover" />
								<button
									type="button"
									onClick={() => {
										handleDeleteImage(index);
									}}
									className="bg-red-700 py-1 px-3 rounded-lg uppercase hover:opacity-70 text-white"
								>
									Delete
								</button>
							</div>
						))}
					<button disabled={loading || uploading} className="py-1 px-3 bg-slate-700 text-white rounded-md uppercase hover:opacity-90 disabled:opacity-90">
						{loading ? "Creating..." : "Create Listing"}
					</button>
					{error && <p className="text-red-700 text-sm">{error}</p>}
				</div>
				{/* END: Right form */}
			</form>
		</main>
	);
}

export default CretateListing;
