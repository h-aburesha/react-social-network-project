import { Component, FormEvent, ChangeEvent } from "react";
import { Link, redirect } from "react-router-dom";
import { Navigate } from "react-router";

interface LoginState {
    email?: string;
    password?: string;
    error?: string;
    userLoggedIn?: boolean;
}

export class LoginForm extends Component<any, LoginState> {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: "",
            userLoggedIn: false,
        };
    }

    handleInputChange = (evt) => {
        evt.preventDefault();
        console.log("evt: ", evt.target.name);
        const property = evt.target.name;
        this.setState({ [property]: evt.target.value });
    };

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (!data.success) {
                    this.setState({ error: "Wrong email or password" });
                } else {
                    console.log("login success");
                    // this.setState({ userLoggedIn: true });
                    // not neeeded because page HAS to be reloaded after cookie is set as LoggedIn
                    // only location.replace("/") should be used to redirect to root
                    location.replace("/");
                    // -- check <Navigate/> below ---
                }
            });
    };

    render() {
        // if (this.state.userLoggedIn) {
        //     return <Navigate to={"/"} />;
        // }
        return (
            <form className="login" onSubmit={this.handleSubmit}>
                <div className="error-message">{this.state.error}</div>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                <button type="submit">Log in</button>
                <Link to="/password/reset/start"> Reset password? </Link>
            </form>
        );
    }
}
