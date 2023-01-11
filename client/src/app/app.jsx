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
            <h1>{user.email}</h1>
            <ProfilePic />
        </>
    );
};
