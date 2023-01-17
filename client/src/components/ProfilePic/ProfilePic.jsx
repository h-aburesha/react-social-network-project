import "./ProfilePic.css";

const ProfilePic = ({ user, onClick }) => {
    return (
        <div className="profile-pic">
            <img
                onClick={onClick}
                src={user?.profilepicurl}
                alt={user?.firstname}
            />
        </div>
    );
};

export default ProfilePic;
