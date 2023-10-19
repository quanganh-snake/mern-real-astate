import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase.js";
function Profile() {
	// variables
	const fileRef = useRef(null);
	const { currentUser } = useSelector((state) => state.user);
	const [fileAvatar, setAvatar] = useState(undefined);
	const [filePerc, setPerc] = useState(0);
	const [fileUploadError, setFileUploadError] = useState(false);
	const [formData, setFormData] = useState({});

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
					console.log("🚀 ~ file: Profile.jsx:35 ~ getDownloadURL ~ downloadURL:", downloadURL);
					setFormData({ ...formData, avatar: downloadURL });
				});
			}
		);
	};

	useEffect(() => {
		if (fileAvatar) {
			handleFileUpload(fileAvatar);
		}
	}, [fileAvatar]);

	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
			<form className="flex flex-col">
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
				<input type="text" placeholder="Username..." id="username" className="border outline-none p-2 mb-3 rounded-lg" />
				<input type="email" placeholder="Email..." id="email" className="border outline-none p-2 mb-3 rounded-lg" />
				<input type="text" placeholder="Password..." id="password" className="border outline-none p-2 mb-3 rounded-lg" />
				<button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">Update</button>
			</form>
			<div className="flex justify-between mt-5">
				<span className="text-red-700 cursor-pointer">Delete Account</span>
				<span className="text-red-700 cursor-pointer">Sign out</span>
			</div>
		</div>
	);
}

export default Profile;
