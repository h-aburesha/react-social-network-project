import { Component, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";

interface LoginState {
    email?: string;
    password?: string;
    error?: string;
}

export class LoginForm extends Component<any, LoginState> {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: "",
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
                } // how to route here with routes?
            });
    };

    render() {
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
                <Link to="/reset-password"> Reset password? </Link>
            </form>
        );
    }
}
