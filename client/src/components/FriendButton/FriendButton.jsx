import { useState, useEffect } from "react";
import "./FriendButton.css";

function FriendButton({ otherUserId }) {
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/friend-request/${otherUserId}`);
            const { friendshipStatus } = await response.json(); // can also send more & then setStatus? isFriend, isPending, isSender
            // console.log("friendData: ", friendshipStatus);
            console.log("response.data: ", friendshipStatus);
            setButtonText(friendshipStatus);
        })()
            .then(() => {
                // console.log("friendData: ");
                // setButtonText(data.buttonText);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [otherUserId]);

    const handleClick = () => {
        const addFriendText = "Add Friend";
        const cancelRequestText = "Cancel Request";
        const pendingRequestText = "Pending Friendship";
        const unfriendText = "Unfriend";

        if (buttonText === addFriendText) {
            fetch(`/api/update-friendship`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    otherUserId,
                    accepted: false,
                    buttonText,
                }),
            });
        } else if (buttonText === cancelRequestText) {
            fetch(`/api/update-friendship`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    otherUserId,
                    accepted: false,
                    buttonText,
                }),
            });
        } else if (buttonText === pendingRequestText) {
            fetch(`/api/update-friendship`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    otherUserId,
                    accepted: true,
                    buttonText,
                }),
            });
        } else if (buttonText === unfriendText) {
            fetch(`/api/update-friendship`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    otherUserId,
                    accepted: false,
                    buttonText,
                }),
            });
        }
    };

    return (
        <button className="friend-button" onClick={handleClick}>
            {" "}
            {buttonText}
        </button>
    );
}

export default FriendButton;
