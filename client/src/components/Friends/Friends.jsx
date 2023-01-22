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
        <div className="Friends">
            <h2>Friends</h2>
            <div className="Friends-list">
                {friends.map((friend) => (
                    <ul
                        key={friend.id}
                        friend={friend}
                        // handleEndFriendship={handleEndFriendship}
                    >
                        <li>
                            {friend.sender_id} {friend.recipient_id}
                            <button
                            // onClick={() => handleEndFriendship(friend.id)}
                            >
                                {" "}
                                Unfriend{" "}
                            </button>
                        </li>
                    </ul>
                ))}
            </div>

            <h2>Friend Requests</h2>
            <div className="Requests-list">
                {requests.map((request) => (
                    <ul
                        key={request.id}
                        request={request}
                        // handleAcceptRequest={handleAcceptRequest}
                        // handleRejectRequest={handleRejectRequest}
                    >
                        <li>
                            {request.sender_id} {request.recipient_id}
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
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    );
};

export default Friends;
