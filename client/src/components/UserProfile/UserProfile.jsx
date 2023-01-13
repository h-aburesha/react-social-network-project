import ProfilePic from "../ProfilePic";
import "./UserProfile.css";

const UserProfile = ({ user, onClick }) => {
    return (
        <>
            <div className="user-profile">
                <ProfilePic user={user} onClick={onClick} />
                <h4>
                    Profile Name: {user?.firstname} {user?.lastname}
                </h4>
            </div>
        </>
    );
};

export default UserProfile;
