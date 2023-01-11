export const ProfilePic = ({ user }) => {
    console.log({ user });

    // const borderColor = loggedIn ? "green" : "grey";
    // const border = `5px solid ${"green"}`;

    return (
        <div className="avatar">
            <img src={user?.profilepicurl} alt={user?.firstname} />
        </div>
    );
};
