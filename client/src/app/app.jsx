import { useState, useEffect } from "react";
import { Logo } from "../components/Logocomponent";
import { ProfilePic } from "../components/ProfilePic";

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
            <Logo firstname={user.firstname} />
            <ProfilePic url={user.profilepicurl} />
            <h5>{user.email}</h5>
            <ProfilePic />
        </>
    );
};
