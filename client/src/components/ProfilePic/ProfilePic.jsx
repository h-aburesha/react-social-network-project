import "./ProfilePic.css";
import { useSelector } from "react-redux";

const ProfilePic = ({ onClick }) => {
    const user = useSelector((state) => state.user);
    console.log();

    return (
        <div className="profile-pic">
            <img
                onClick={onClick}
                src={user.user?.profilepicurl}
                alt={user.user?.firstname}
            />
        </div>
    );
};

export default ProfilePic;
