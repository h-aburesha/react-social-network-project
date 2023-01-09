import { Component } from "react";
import { Logo } from "../components/Logocomponent";

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
                <h4> -- Logged in experience -- </h4>
            </>
        );
    }
}

// user={this.state.username}
