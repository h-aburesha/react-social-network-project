import { Component } from "react";
import { Logo } from "../components/Logocomponent";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        // bind stuff if you use normal functions
    }

    render() {
        return (
            <div>
                <Logo />
            </div>
        );
    }
}
