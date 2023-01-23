import "./Friends.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, setRequests } from "../../Redux/friendshipSlice";

const Friends = () => {
    const dispatch = useDispatch();
    const friends = useSelector((state) => state.friendships.friends);
    const requests = useSelector((state) => state.friendships.requests);

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/friends`);
            const data = await response.json();
            console.log("RES(DATA) Friends from DB:", data);

            const friends = data.friendships.filter(
                (friendship) => friendship.accepted
            );
            const requests = data.friendships.filter(
                (friendship) => !friendship.accepted
            );
            dispatch(setFriends(friends));
            dispatch(setRequests(requests));

            console.log(
                "FRIENDS & REQUESTS",
                "friends:",
                friends,
                "requests:",
                requests,
                "data:",
                data
            );
        })();
    }, [friends, requests]);

    // friends, requests
    const handleAcceptRequest = (sender_id, recipient_id) => {
        let accepted = true;

        fetch(`/api/friends`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                accepted,
                sender_id,
                recipient_id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("data", data);
                dispatch(setFriends(friends));
            })
            .catch((err) => {
                console.error("error in /api/friends POST Client Side", err);
            });
    };

    const handleEndFriendship = (sender_id, recipient_id) => {
        let accepted = false;

        fetch(`/api/friends`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                accepted,
                sender_id,
                recipient_id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch(setRequests(requests));
                console.log("data", data);
            });
    };

    return (
        <div className="friendship-container">
            <h2>Friends</h2>
            <div className="other-profile-card">
                {friends.map((friend) => (
                    <ul
                        key={friend.id}
                        friend={friend}

                        // handleEndFriendship={handleEndFriendship}
                    >
                        <li className="friends-list">
                            <h5 className="profile-details">
                                {friend.recipient_firstname}{" "}
                                {friend.recipient_lastname}
                                <button
                                    onClick={() =>
                                        handleEndFriendship(
                                            friend.sender_id,
                                            friend.recipient_id
                                        )
                                    }
                                >
                                    {" "}
                                    Unfriend{" "}
                                </button>
                            </h5>
                            <div className="other-profile-image">
                                <img
                                    src={friend.recipient_profilepicurl}
                                    alt={friend.recipient_firstname}
                                />
                            </div>
                        </li>
                    </ul>
                ))}
            </div>
            <hr />
            <h2>Friend Requests</h2>
            <div className="other-profile-card">
                {requests.map((request) => (
                    <ul key={request.id} request={request}>
                        <li className="friends-list">
                            <h5 className="profile-details">
                                {request.recipient_firstname}{" "}
                                {request.recipient_lastname}
                                <button
                                    onClick={() =>
                                        handleAcceptRequest(
                                            request.sender_id,
                                            request.recipient_id
                                        )
                                    }
                                >
                                    {" "}
                                    Pending{" "}
                                </button>
                            </h5>
                            <div className="other-profile-image">
                                <img
                                    src={request.recipient_profilepicurl}
                                    alt={request.recipient_firstname}
                                />
                            </div>
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    );
};

export default Friends;
