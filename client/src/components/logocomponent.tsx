import { Component } from "react";

export class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: "",
        };
    }

    render = () => {
        return (
            <div className="logo">
                <img src="/logo.png" />
            </div>
        );
    };
}
