const ProfilePic = ({ user, onClick }) => {
    return (
        <div className="avatar">
            <img
                onClick={onClick}
                src={user?.profilepicurl}
                alt={user?.firstname}
            />
        </div>
    );
};

export default ProfilePic;
