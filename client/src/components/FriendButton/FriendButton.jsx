import { useState, useEffect } from "react";
import "./FriendButton.css";

function FriendButton({ otherUserId }) {
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        fetch(`/api/friend-request/${otherUserId}`)
            .then((data) => {
                console.log("friendData: ", data);
                // setButtonText(data.buttonText);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [otherUserId]);

    // const handleFriendship = () => {};

    return <button className="friend-button"> {buttonText}Add Friend</button>;
}

export default FriendButton;
