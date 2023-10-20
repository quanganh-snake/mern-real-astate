import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase.js";
import Swal from "sweetalert2";
import {
	updateUserStart,
	updateUserSuccess,
	updateUserFailed,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailed,
	signOutUserStart,
	signOutUserSuccess,
	signOutUserFailed,
} from "../redux/slice/userSlice.js";
import { Link } from "react-router-dom";
function Profile() {
	// variables
	const fileRef = useRef(null);
	const { currentUser, loading, error } = useSelector((state) => state.user);
	const [fileAvatar, setAvatar] = useState(undefined);
	const [filePerc, setPerc] = useState(0);
	const [fileUploadError, setFileUploadError] = useState(false);
	const [formData, setFormData] = useState({});
	const [updateSuccess, setUpdateSuccess] = useState(false);
	const [showListingError, setShowListingError] = useState(false);
	const [userListing, setUserListing] = useState([]);
	const dispatch = useDispatch();

	//event handlers
	const handleFileUpload = (file) => {
		const storage = getStorage(app);
		const fileName = new Date().getTime() + "_" + file.name;
		const storageRef = ref(storage, fileName);
		// Muon luu tru vao trong folder: const storageRef = ref(storage, `avatar/${fileName}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setPerc(Math.round(progress));
			},
			(error) => {
				setFileUploadError(true);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setFormData({ ...formData, avatar: downloadURL });
				});
			}
		);
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(updateUserStart());
			const res = await fetch(`/api/v1/user/update/${currentUser._id}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await res.json();
			if (data.success === false) {
				dispatch(updateUserFailed(data.message));
				return;
			}

			dispatch(updateUserSuccess(data));
			setUpdateSuccess(true);
		} catch (error) {
			dispatch(updateUserFailed(error.message));
		}
	};

	const handleDeleteUser = async () => {
		try {
			dispatch(deleteUserStart());
			const res = await fetch(`/api/v1/user/delete/${currentUser._id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (data.success === false) {
				dispatch(deleteUserFailed(data.message));
				return;
			}
			dispatch(deleteUserSuccess(data));
		} catch (error) {
			dispatch(deleteUserFailed(error.message));
		}
	};

	const handleSignOut = async () => {
		try {
			dispatch(signOutUserStart());
			const res = await fetch(`/api/v1/auth/signout`);
			const data = await res.json();
			if (data.success === false) {
				dispatch(signOutUserFailed(data.message));
				return;
			}
			dispatch(signOutUserSuccess(data));
		} catch (error) {
			dispatch(signOutUserFailed(error.message));
			console.log(`Error: ${error}`);
		}
	};

	const handleShowListing = async () => {
		try {
			setShowListingError(false);
			const res = await fetch(`/api/v1/user/listings/${currentUser._id}`);
			const data = await res.json();
			if (data.success === false) {
				setShowListingError(true);
				return;
			}
			setUserListing(data);
		} catch (error) {
			setShowListingError(true);
		}
	};

	const handleDeleteListing = async (id) => {
		try {
			Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			}).then(async (result) => {
				if (result.isConfirmed) {
					const res = await fetch(`/api/v1/listing/delete/${id}`, {
						method: "DELETE",
					});
					const data = await res.json();
					if (data.success === false) {
						console.log(data.message);
						return;
					}
					setUserListing((prev) => prev.filter((listing) => listing._id !== id));
					Swal.fire("Deleted!", "Your listing has been deleted.", "success");
				}
			});
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		if (fileAvatar) {
			handleFileUpload(fileAvatar);
		}
	}, [fileAvatar]);

	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
			<form onSubmit={handleSubmit} className="flex flex-col">
				<input
					type="file"
					ref={fileRef}
					hidden
					onChange={(e) => {
						setAvatar(e.target.files[0]);
					}}
				/>
				<img
					src={formData.avatar || currentUser.avatar}
					accept="image/*"
					onClick={() => fileRef.current.click()}
					alt="profile"
					className="rounded-full outline-none h-24 w-24 mb-4 object-cover cursor-auto self-center mt-2"
				/>

				<p className="text-sm text-center mb-3">
					{fileUploadError ? (
						<span className="text-red-700">Image update errors, due to too large file size or incorrect formatting (Image file: .png, .jpeg, .jpg, .gif and size &#60; 2MB)</span>
					) : filePerc > 0 && filePerc < 100 ? (
						<span className="text-slate-700">Image uploadting {filePerc} %</span>
					) : filePerc === 100 ? (
						<span className="text-green-700">Image upload successfully!</span>
					) : null}
				</p>
				<input type="text" placeholder="Username..." id="username" defaultValue={currentUser.username} onChange={handleChange} className="border outline-none p-2 mb-3 rounded-lg" />
				<input type="email" placeholder="Email..." id="email" defaultValue={currentUser.email} onChange={handleChange} className="border outline-none p-2 mb-3 rounded-lg" />
				<input type="password" placeholder="Password..." id="password" onChange={handleChange} className="border outline-none p-2 mb-3 rounded-lg" />
				<p className="text-center text-red-700 mb-3">{error ? error : null}</p>
				<p className="text-center text-green-700 mb-3">{updateSuccess ? "User is uploaded successfully!!!" : null}</p>
				<button className="bg-slate-700 text-white rounded-lg mb-3 p-3 uppercase hover:opacity-95 disabled:opacity-80">{loading ? "Loading..." : "Update"}</button>
				<Link to="/create-listing" className="button bg-green-700 uppercase p-3 rounded-lg text-white text-center hover:opacity-95 disabled:opacity-80">
					Create Listing
				</Link>
			</form>
			<div className="flex justify-between mt-5">
				<span className="text-red-700 cursor-pointer" onClick={handleDeleteUser}>
					Delete Account
				</span>
				<span onClick={handleSignOut} className="text-red-700 cursor-pointer">
					Sign out
				</span>
			</div>
			<button onClick={handleShowListing} className="text-green-700 w-full mb-3">
				Show Listings
			</button>
			{showListingError && <p className="text-red-700">Error showing listings...</p>}
			{userListing && userListing.length > 0 && (
				<div className="">
					<h1 className="text-center my-7 text-3xl font-semibold">Your Listings</h1>
					{userListing.map((listing) => (
						<div className="w-full flex items-center justify-between border shadow rounded-lg bg-white hover:bg-slate-100 mb-2 p-3" key={listing._id}>
							<Link to={`/listing/${listing._id}`}>
								<img src={listing.imageUrls[0]} alt="thumbnail" className="w-50 h-16 rounded-lg object-contain" />
							</Link>
							<Link className="hover:underline font-semibold" to={`/listing/${listing._id}`}>
								<p>{listing.name}</p>
							</Link>
							<div className="flex flex-col gap-y-2">
								<button
									type="button"
									onClick={() => {
										handleDeleteListing(listing._id);
									}}
									className="bg-red-700 px-3 py-1 rounded-lg text-white hover:underline font-semibold"
								>
									Delete
								</button>
								<button type="button" className="bg-yellow-500 px-3 py-1 rounded-lg text-black hover:underline font-semibold">
									Edit
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default Profile;
