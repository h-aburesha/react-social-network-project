import { useState, useEffect } from "react";
import "./FriendButton.css";

function FriendButton({ otherUserId }) {
    useEffect(() => {
        fetch(`/api/friend-request/${otherUserId}`)
            .then((res) => {})
            .then((data) => {
                setButtonText(data.buttonText);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [otherUserId]);

    const handleFriendship = () => {};

    return <button className="friend-button">Add Friend</button>;
}

export default FriendButton;
