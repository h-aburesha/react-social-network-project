import { Component, FormEvent } from "react";
import { Logo } from "../Logo/Logocomponent";
import { Link } from "react-router-dom";
import { Navigate } from "react-router";

// interface Friend {
//     firstname: string,
//     lastname: string,
// }

interface RegistrationState {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    error?: string;
    userRegistered?: boolean;
}

// first any, props that come from the parent

export class Registration extends Component<any, RegistrationState> {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            error: "",
            userRegistered: false,
        };
    }

    handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();
        console.log("evt: ", evt);
        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("/registration data: ", data);
                if (data.success) {
                    // console.log("registration success");
                    this.setState({ userRegistered: true });
                    console.log("userRegistered? :", this.state.userRegistered);
                } else {
                    this.setState({
                        error: "Email already exists!!",
                    });
                }
            });
    };

    handleInputChange = (evt) => {
        evt.preventDefault();
        console.log("evt: ", evt.target.name);
        const property = evt.target.name;
        this.setState({ [property]: evt.target.value });
    };

    // customFunction = (Friends: Friend[]) => {

    // }

    render = () => {
        // console.log("state: ", this.state);
        if (this.state.userRegistered) {
            return <Navigate to={"/login"} />;
        }
        return (
            <div className="registeration-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="error-message">{this.state.error}</div>
                    <div className="form-input-span">
                        <span>Firstname</span>
                        <input
                            type="text"
                            name="firstname"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-input-span">
                        <span>Lastname</span>
                        <input
                            type="text"
                            name="lastname"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-input-span">
                        <span>Email</span>
                        <input
                            type="email"
                            name="email"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-input-span">
                        <span>Password</span>
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-input-span">
                        <button>Register</button>
                    </div>
                </form>
                <Link to="/login"> Already a member? </Link>
            </div>
        );
    };
}
