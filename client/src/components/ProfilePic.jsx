export const ProfilePic = ({ user, onClick }) => {
    console.log({ user });

    // const borderColor = loggedIn ? "green" : "grey";
    // const border = `5px solid ${"green"}`;

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
