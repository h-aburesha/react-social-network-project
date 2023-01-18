import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FriendButton from "../FriendButton/FriendButton";
import "./OtherProfile.css";

const OtherProfile = () => {
    let { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/user/${id}`);
            const data = await response.json();
            setUser(data.user);
            console.log("RES(DATA) User OtherProfile: ", data);
        })();
    }, []);

    return (
        <>
            <li className="other-profile-card" key={user.id}>
                <div className="other-profile-image">
                    <img src={user.profilepicurl} alt={user.firstname} />
                </div>
                <div className="other-profile-details">
                    <h4>
                        {user.firstname} {user.lastname}
                    </h4>
                    <h4>{user.bio}</h4>
                    <FriendButton otherUserId={user.id} />
                </div>
            </li>
        </>
    );
};

export default OtherProfile;
