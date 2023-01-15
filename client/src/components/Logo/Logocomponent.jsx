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
                <h5>
                    I am a passed prop from App-Mama!: {this.props.firstname}
                </h5>
                <p>Cherry pick new friends .. </p>
            </div>
        );
    };
}
