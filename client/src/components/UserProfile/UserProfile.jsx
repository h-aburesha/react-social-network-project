import ProfilePic from "../ProfilePic/ProfilePic";
import { useSelector, useDispatch } from "react-redux";
import { updateUserBio } from "../../Redux/userSlice";

import { useState } from "react";

import "./UserProfile.css";

function UserProfile({ onClick }) {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    const [bio, setBio] = useState("");
    const [editing, setEditing] = useState(false);

    const handleChange = (event) => {
        console.log("handleChange evt: ", event.target.value);
        setBio(event.target.value);
    };

    const handleBioSubmit = async (event) => {
        event.preventDefault();
        console.log("handleSaveEvent: ", bio, user.user?.id);

        fetch("/update-bio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bio: bio,
                userId: user.user?.id,
            }),
        })
            .then(({ user }) => {
                dispatch(updateUserBio(bio));
                console.log("I have updated bio :", bio);
            })
            .catch((error) => {
                console.log("error in bio/post: ", error);
            });

        setEditing(false);
    };

    const handleEdit = () => {
        setEditing(!editing);
    };

    return (
        <>
            <div className="user-profile">
                <ProfilePic onClick={onClick} />
                Profile Name: {user.user?.firstname} {user.user?.lastname}
                <h4> About me: {user.user?.bio}</h4>
                <div style={{ display: editing ? "block" : "none" }}>
                    <textarea name="bio" value={bio} onChange={handleChange} />
                    <button onClick={handleBioSubmit}>Save</button>
                </div>
                <button onClick={handleEdit}>
                    {editing ? "Cancel" : "Edit"}
                </button>
            </div>
        </>
    );
}

export default UserProfile;
