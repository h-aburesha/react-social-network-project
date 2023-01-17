import { useState, useEffect } from "react";
import { Logo } from "../components/Logo/Logocomponent";
import ProfilePic from "../components/ProfilePic/ProfilePic";
import UserProfile from "../components/UserProfile/UserProfile";
import UploadProfilePicture from "../components/Uploader/Uploader";
import FindPeople from "../components/FindPeople/FindPeople";
import "./app.css";

import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "../Redux/counter";

export const App = () => {
    /* --------------- REDUX Sandbox --------------- */

    const { count } = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    /* --------------- REDUX Sandbox --------------- */

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

    function updateBio(bio) {
        setUser({ ...user, bio: bio });
    }

    return (
        <>
            <hr />
            <ProfilePic user={user} onClick={handleProfilePictureClick} />
            {showFileUpload && (
                <UploadProfilePicture userId={user.id} updatePic={updatePic} />
            )}
            <hr />
            <div className="redux-counter">
                <h1> The count is: {count}</h1>
                <div className="redux-buttons">
                    <button onClick={() => dispatch(increment())}>
                        Increment
                    </button>
                    <button onClick={() => dispatch(decrement())}>
                        Decrement
                    </button>
                    <button onClick={() => dispatch(incrementByAmount(33))}>
                        Increment by 33
                    </button>
                </div>
            </div>
            <hr />
            <Logo />
            <FindPeople />
            <hr />
            <UserProfile
                user={user}
                onClick={handleProfilePictureClick}
                updatePic={updatePic}
                updateBio={updateBio}
            />

            <hr />
        </>
    );
};
