import { useState, useEffect } from "react";
import "./FriendButton.css";

function FriendButton({ otherUserId }) {
    const [buttonText, setButtonText] = useState("Loading...");
    const [isFriend, setIsFriend] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [isSender, setIsSender] = useState(false);

    useEffect(() => {
        fetch(`/friend-request/${otherUserId}`)
            .then((res) => {
                const { isFriend, isPending, isSender } = res.data;
                setIsFriend(isFriend);
                setIsPending(isPending);
                setIsSender(isSender);
                updateButtonText();
            })
            .catch((err) => {
                console.error(err);
                setButtonText("Error friend request");
            });
    }, [otherUserId]);

    function updateButtonText() {
        if (isFriend) {
            setButtonText("Unfriend");
        } else if (isPending) {
            if (isSender) {
                setButtonText("Cancel Friend Request");
            } else {
                setButtonText("Accept Friend Request");
            }
        } else {
            setButtonText("Send Friend Request");
        }
    }

    function handleClick() {
        // Make POST request to update friend request information
        if (isFriend) {
            fetch(`/unfriend/${otherUserId}`, {
                method: "POST",
            })
                .then((res) => {
                    setIsFriend(false);
                    setButtonText("Send Friend Request");
                })
                .catch((err) => console.error(err));
        } else if (isPending) {
            if (isSender) {
                fetch(`/cancel-friend-request/${otherUserId}`, {
                    method: "POST",
                })
                    .then((res) => {
                        setIsPending(false);
                        setButtonText("Send Friend Request");
                    })
                    .catch((err) => console.error(err));
            } else {
                fetch(`/accept-friend-request/${otherUserId}`, {
                    method: "POST",
                })
                    .then((res) => {
                        setIsPending(false);
                        setIsFriend(true);
                        setButtonText("Unfriend");
                    })
                    .catch((err) => console.error(err));
            }
        } else {
            fetch(`/friend-request/${otherUserId}`, { method: "POST" })
                .then((res) => {
                    setIsPending(true);
                    setButtonText("Cancel Friend Request");
                })
                .catch((err) => console.error(err));
        }
    }

    return (
        <button className="friend-button" onClick={handleClick}>
            {buttonText}
        </button>
    );
}
