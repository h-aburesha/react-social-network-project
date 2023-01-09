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
                <h1> Say Jam!</h1>
                <p>Cherry pick new friends .. </p>
            </div>
        );
    };
}
