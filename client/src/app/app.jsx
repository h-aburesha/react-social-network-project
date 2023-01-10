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

// user={this.state.username}
