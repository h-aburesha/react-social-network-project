import { createRef, useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUser } from "../../Redux/userSlice";

import { updateProfilePic } from "../../Redux/userSlice";
import "./Uploader.css";

const UploadProfilePicture = ({ onClick }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const [picture, setPicture] = useState(null);
    const fileInput = createRef();

    const handleChange = (event) => {
        setPicture(event.target.files[0]);
        console.log("handleSubmit evt: ", event, "userId", user.user.id);
    };

    const closeOverlay = (evt) => {
        if (evt.currentTarget === evt.target) {
            onClick(evt);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("handleSubmit evt: ", event);
        console.log("fileInput evt: ", fileInput.current.files[0]);

        const formData = new FormData();

        // console.log(("event.target.files[0]: ", event.target.files));

        formData.append("file", fileInput.current.files[0]);
        formData.append("userId", user.user.id);
        // sending userId back to the server as second parameter for uploadPictureById()

        fetch("/upload-profile-pic", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                return res.json();
            })
            .then(({ user }) => {
                console.log(
                    "res.json({user}) :",
                    "user?.profilepicurl",
                    user?.profilepicurl
                );
                // dispatch(setUser(user.profilepicurl));
                dispatch(updateProfilePic(user?.profilepicurl));
                // console.log("I have updated profilepic :", user.profilepicurl);
            })
            .catch((error) => {
                console.log("error in profile/post: ", error);
            });

        setPicture(null);
    };

    return (
        <div className="overlay" onClick={closeOverlay}>
            <form className="uploader-form" onSubmit={handleSubmit}>
                <label htmlFor="picture">Upload Profile picture:</label>
                <input
                    type="file"
                    ref={fileInput}
                    name="file"
                    id="profile-picture"
                    onChange={handleChange}
                    accept="image/*"
                />
                <br />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadProfilePicture;
