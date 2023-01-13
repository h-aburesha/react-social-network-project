import ProfilePic from "../ProfilePic";
import "./UserProfile.css";
import { useState } from "react";

const UserProfile = ({ user, onClick }) => {
    const [bio, setBio] = useState("No bio yet.");
    const [editing, setEditing] = useState(false);

    const handleChange = (event) => {
        console.log("handleChange evt: ", event.target.value);
        setBio(event.target.value);
    };

    const handleSave = async (event) => {
        event.preventDefault();
        console.log("handleSaveEvent: ", bio);
        fetch("/update-bio", {
            method: "POST",
            body: formData,
        });
        // DB & Server Logic

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
                <div style={{ display: editing ? "block" : "none" }}>
                    <textarea name="bio" value={bio} onChange={handleChange} />
                    <button onClick={handleSave}>Save</button>
                </div>
                <button onClick={handleEdit}>
                    {editing ? "Cancel" : "Edit"}
                </button>
            </div>
        </>
    );
};

export default UserProfile;
