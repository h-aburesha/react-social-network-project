import { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor() {
        super();
        this.state = { step: 1, success: "", error: "", email: "" };
        this.whatToRender = this.whatToRender.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        switch (this.state.step) {
            case 1:
                // Make a Post request to server and check if the user exists
                fetch("/password/reset/start", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                    }),
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        if (data.success) {
                            this.setState({
                                step: 2,
                                success: "Password reset instructions sent!",
                            });
                        } else {
                            this.setState({
                                error: "Email does not exist!",
                            });
                        }
                    });
                break;
            case 2:
                fetch("/password/reset/verify", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        code: this.state.code,
                        password: this.state.password,
                        email: this.state.email,
                    }),
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        if (data.success) {
                            this.setState({
                                step: 3,
                                success: "Password was reset!",
                            });
                        } else {
                            this.setState({
                                error: "Something went wrong !",
                            });
                        }
                    });
                break;
            default:
                break;
        }
    }

    whatToRender() {
        switch (this.state.step) {
            case 1:
                return (
                    <>
                        Step 1
                        <form
                            className="reset-password"
                            onSubmit={this.handleSubmit}
                        >
                            <div className="success-message">
                                {this.state.success}
                            </div>
                            <div className="error-message">
                                {this.state.error}
                            </div>

                            <h3>Reset your password</h3>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                key="email"
                                onChange={this.handleChange}
                            />
                            <br />
                            <button type="submit">Send reset email</button>
                        </form>
                    </>
                );
            case 2:
                return (
                    <>
                        Step 2
                        <form
                            className="reset-password"
                            onSubmit={this.handleSubmit}
                        >
                            <div className="success-message">
                                {this.state.success}
                            </div>
                            <div className="error-message">
                                {this.state.error}
                            </div>

                            <h3>Reset your password</h3>
                            <label htmlFor="code">Secret Code:</label>
                            <input
                                type="text"
                                name="code"
                                ref="codeRef"
                                key="code"
                                onChange={this.handleChange}
                            />
                            <br />
                            <label>New Password:</label>
                            <input
                                type="password"
                                name="password"
                                ref="passwordRef"
                                key="pass"
                                onChange={this.handleChange}
                            />
                            <button type="submit">Set new password</button>
                        </form>
                    </>
                );
            case 3:
                return <h1>Step 3</h1>;

            default:
                break;
        }
    }

    render() {
        return <div>{this.whatToRender()}</div>;
    }
}
