import { useState, useEffect } from "react";
import { Logo } from "../components/Logocomponent";
import { ProfilePic } from "../components/ProfilePic";
import { UploadProfilePicture } from "../components/Uploader";

export const App = () => {
    const [user, setUser] = useState([]);

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
            <ProfilePic user={user} />
            <UploadProfilePicture userId={user.id} />
            <h5>{user.email}</h5>
        </>
    );
};
