import { useState, useEffect } from "react";
import { Logo } from "../components/Logocomponent";
import { ProfilePic } from "../components/ProfilePic";
import { UploadProfilePicture } from "../components/Uploader";

export const App = () => {
    const [user, setUser] = useState([]);
    const [showFileUpload, setShowFileUpload] = useState(false);

    const handleProfilePictureClick = () => {
        setShowFileUpload(!showFileUpload);
    };

    useEffect(() => {
        (async () => {
            const data = await fetch(`/user`).then((response) =>
                response.json()
            );
            setUser(data.user);
        })();
    }, []);

    return (
        <>
            <Logo />

            <ProfilePic user={user} onClick={handleProfilePictureClick} />
            {showFileUpload && (
                <UploadProfilePicture
                    userId={user.id}
                    onClick={handleProfilePictureClick}
                />
            )}
            <hr />
            <hr />
            <h5>{user.email}</h5>
        </>
    );
};
