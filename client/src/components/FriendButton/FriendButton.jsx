import { useState, useEffect } from "react";
import "./FriendButton.css";

function FriendButton({ otherUserId }) {
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/friend-request/${otherUserId}`);
            const { friendshipStatus } = await response.json();
            // console.log("friendData: ", friendshipStatus);
            setButtonText(friendshipStatus); // Self mind blown !!
        })()
            .then(() => {
                // console.log("friendData: ");
                // setButtonText(data.buttonText);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [otherUserId]);

    // const handleFriendship = () => {};

    return <button className="friend-button"> {buttonText}</button>;
}

export default FriendButton;
