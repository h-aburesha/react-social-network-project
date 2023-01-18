import { useState, useEffect } from "react";
import "./FriendButton.css";

function FriendButton({ otherUserId }) {
    const [buttonText, setButtonText] = useState("");
    const [isFriend, setIsFriend] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/friend-request/${otherUserId}`);
            const { friendshipStatus, isFriend } = await response.json(); // can also send more & then setStatus? isFriend, isPending, isSender
            // console.log("friendData: ", friendshipStatus);
            console.log("response.data: ", friendshipStatus);
            setIsFriend(isFriend);
            console.log(" ClientSide isFriend?: ", isFriend);
            updateButtonText();
        })()
            .then(() => {
                // console.log("friendData: ");
                // setButtonText(data.buttonText);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [otherUserId]);

    const updateButtonText = () => {
        if (!isFriend) {
            setButtonText("Add Friend  🍓");
        }
    };

    const handleClick = () => {
        if (!isFriend) {
            fetch(`/api/add-friend/${otherUserId}`, { method: "POST" });
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
