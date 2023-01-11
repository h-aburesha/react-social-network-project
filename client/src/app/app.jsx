import { useState } from "react";
import { Logo } from "../components/Logocomponent";
import { ProfilePic } from "../components/ProfilePic";

export const App = () => {
    const [username, setUsername] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <>
            <Logo user={username} />
            <ProfilePic />

            <h4 style={{ textAlign: "center" }}>-- Logged in experience --</h4>
        </>
    );
};

/* 

import { Component } from "react";
import { Logo } from "../components/Logocomponent";
import { ProfilePic } from "../components/ProfilePic";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            isPopupOpen: false,
        };
        // bind stuff if you use normal functions
    }

    render() {
        return (
            <>
                <Logo user={this.state.username} />
                <ProfilePic src={this.src} name="test.prop.works!!" />

                <h4 style={{ textAlign: "center" }}>
                    -- Logged in experience --
                </h4>
            </>
        );
    }
}

*/
