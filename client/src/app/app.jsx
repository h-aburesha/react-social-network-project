import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUser } from "../Redux/userSlice";
import { useSelector } from "react-redux";

import Logo from "../components/Logo/Logocomponent";
import ProfilePic from "../components/ProfilePic/ProfilePic";
import UserProfile from "../components/UserProfile/UserProfile";
import UploadProfilePicture from "../components/Uploader/Uploader";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import FindPeople from "../components/FindPeople/FindPeople";
import OtherProfile from "../components/OtherProfile/OtherProfile";
import Friends from "../components/Friends/Friends";
import "./app.css";

export const App = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    console.log(
        "State: ",
        useSelector((state) => state)
    );

    useEffect(() => {
        (async () => {
            const response = await fetch(`/user`);
            const data = await response.json();
            console.log("RES(DATA) Users from DB:", data);
            dispatch(setUser(data.user));
            console.log("AFTER RES(DATA) Users from DB:", data);
        })();
    }, []);

    const [showFileUpload, setShowFileUpload] = useState(false);

    const handleProfilePictureClick = () => {
        setShowFileUpload(!showFileUpload);
    };

    function handleLogout() {
        fetch("/logout", {
            method: "POST",
        }).then(() => {
            location.replace("/");
        });
    }

    return (
        <>
            {/* <NavigationBar /> */}

            <BrowserRouter>
                <hr />
                <header className="header">
                    <Link to="/">
                        <Logo />
                    </Link>
                    <div className="nav-right">
                        <ProfilePic onClick={handleProfilePictureClick} />
                        {showFileUpload && (
                            <UploadProfilePicture
                                onClick={handleProfilePictureClick}
                            />
                        )}
                        <Link to="/users"> 🍒 Find new people? </Link>
                        <Link to="/friends"> 🍍 See Friendship </Link>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </header>
                <hr />
                <main>
                    <Routes>
                        <Route path="/users" element={<FindPeople />} />
                        <Route path="/user/:id" element={<OtherProfile />} />
                        <Route path="/friends" element={<Friends />} />

                        <Route
                            path="/"
                            element={
                                <UserProfile
                                    onClick={handleProfilePictureClick}
                                />
                            }
                        />
                        <Route
                            path="/navigation"
                            element={
                                <NavigationBar
                                    onClick={handleProfilePictureClick}
                                />
                            }
                        />
                    </Routes>
                </main>
            </BrowserRouter>
        </>
    );
};

/* 

    
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

*/
