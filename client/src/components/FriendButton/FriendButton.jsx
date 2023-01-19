import { useState, useEffect } from "react";
import "./FriendButton.css";

function FriendButton({ otherUserId }) {
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/friend-request/${otherUserId}`);
            const { friendshipStatus, isFriend } = await response.json(); // can also send more & then setStatus? isFriend, isPending, isSender
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
        if (buttonText === "Add Friend") {
            fetch(`/api/update-friendship`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    otherUserId,
                    accepted: false,
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
