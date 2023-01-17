import "./NavigationBar.css";
import Logo from "../Logo/Logocomponent";
import ProfilePic from "../ProfilePic/ProfilePic";
import { Link } from "react-router-dom";

const NavigationBar = ({ user, onClick, updateBio }) => {
    return (
        <>
            <header>
                <div className="nav-bar-containter">
                    <Logo />
                    <ProfilePic user={user} onClick={onClick} />
                    <button>
                        <Link to="/users"> Find new people? 🍒 </Link>
                    </button>
                    <button>Logout</button>
                </div>
            </header>
        </>
    );
};

export default NavigationBar;
