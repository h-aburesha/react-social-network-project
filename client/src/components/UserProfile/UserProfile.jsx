import { ProfilePic } from "../ProfilePic";

export const UserProfile = ({ user, onClick }) => {
    return (
        <>
            <ProfilePic user={user} onClick={onClick} />
            <h5>{user?.firstname}</h5>
        </>
    );
};
