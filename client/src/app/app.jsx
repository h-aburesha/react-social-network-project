import { useState, useEffect } from "react";
import { Logo } from "../components/Logocomponent";
import ProfilePic from "../components/ProfilePic";
import UserProfile from "../components/UserProfile/UserProfile";
import UploadProfilePicture from "../components/Uploader";

export const App = () => {
    const [user, setUser] = useState([]);
    const [showFileUpload, setShowFileUpload] = useState(false);

    const handleProfilePictureClick = () => {
        setShowFileUpload(!showFileUpload);
    };

    useEffect(() => {
        (async () => {
            const response = await fetch(`/user`);
            const data = await response.json();
            setUser(data.user);
        })();
    }, []);

    function updatePic(file) {
        setUser({ ...user, profilepicurl: file });
    }

    return (
        <>
            <Logo />

            <hr />
            <ProfilePic user={user} onClick={handleProfilePictureClick} />
            {showFileUpload && (
                <UploadProfilePicture userId={user.id} updatePic={updatePic} />
            )}
            <hr />
            <UserProfile
                user={user}
                onClick={handleProfilePictureClick}
                updatePic={updatePic}
            />
            <hr />
        </>
    );
};
