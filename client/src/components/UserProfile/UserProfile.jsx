import ProfilePic from "../ProfilePic/ProfilePic";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./UserProfile.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function UserProfile({ user, onClick, updateBio }) {
    const [bio, setBio] = useState("");
    const [editing, setEditing] = useState(false);

    const handleChange = (event) => {
        console.log("handleChange evt: ", event.target.value);
        setBio(event.target.value);
    };

    const handleBioSubmit = async (event) => {
        event.preventDefault();
        console.log("handleSaveEvent: ", bio, user?.id);

        fetch("/update-bio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bio: bio,
                userId: user?.id,
            }),
        })
            .then(() => {
                updateBio(bio);
                console.log("I have updated bio :");
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
                <ProfilePic user={user} onClick={onClick} />
                Profile Name: {user?.firstname} {user?.lastname}
                <h4> About me: {user?.bio}</h4>
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
