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
    }, []);

    return (
        <div className="friends">
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
                                {friend.sender_id} {friend.recipient_id}
                                {friend.recipient_firstname}{" "}
                                {friend.recipient_lastname}
                                <button
                                // onClick={() => handleEndFriendship(friend.id)}
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

            <h2>Friend Requests</h2>
            <div className="other-profile-card">
                {requests.map((request) => (
                    <ul
                        key={request.id}
                        request={request}

                        // handleAcceptRequest={handleAcceptRequest}
                        // handleRejectRequest={handleRejectRequest}
                    >
                        <li className="friends-list">
                            <h5 className="profile-details">
                                {request.sender_id} {request.recipient_id}
                                {request.recipient_firstname}{" "}
                                {request.recipient_lastname}
                                <button
                                // onClick={() =>
                                //     handleAcceptRequest(
                                //         request.id,
                                //         request.sender.id
                                //     )
                                // }
                                >
                                    {" "}
                                    Accept{" "}
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
