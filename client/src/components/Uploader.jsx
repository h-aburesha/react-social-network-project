import { createRef, useState } from "react";

export const UploadProfilePicture = ({ userId, onClick }) => {
    const [picture, setPicture] = useState(null);
    const fileInput = createRef();

    const handleChange = (event) => {
        setPicture(event.target.files[0]);
        console.log("handleSubmit evt: ", event, "userId", userId);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("handleSubmit evt: ", event);
        console.log("fileInput evt: ", fileInput.current.files[0]);

        const formData = new FormData();

        // console.log(("event.target.files[0]: ", event.target.files));

        formData.append("file", fileInput.current.files[0]);
        formData.append("userId", userId);
        // sending userId back to the server as second parameter for uploadPictureById()

        fetch("/upload-profile-pic", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("file data? :", data);
            });
        setPicture(null);
    };

    return (
        <form onSubmit={handleSubmit}>
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
    );
};
