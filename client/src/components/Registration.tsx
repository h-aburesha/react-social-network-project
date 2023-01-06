import { Component, FormEvent } from "react";
import { Logo } from "./Logocomponent";

// interface Friend {
//     firstname: string,
//     lastname: string,
// }

interface RegistrationState {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
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
        };
    }

    handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();
        console.log("evt: ", evt);
        fetch("/add-formdata", {
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
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                // console.log("/registration data: ", data);
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
        console.log("state: ", this.state);
        return (
            <div className="registeration-container">
                <Logo />
                <h1> Hi at Jam!</h1>
                <p>Cherry pick new friends .. </p>
                <form onSubmit={this.handleSubmit}>
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
                {/* link to login page with <a> tag */}
            </div>
        );
    };
}

/*
<div className="form-text-inputs-flex">

    <form onSubmit={this.handleSubmit}>
        <span>Firstname: </span>
        <input type="text" name="firstname" onChange={this.handleInputChange} />
        <span>Lastname: </span>
        <input type="text" name="lastname" onChange={this.handleInputChange} />
        <span>Email: </span>
        <input type="email" name="email" onChange={this.handleInputChange} />
        <span>Password: </span>
        <input
            type="password"
            name="password"
            onChange={this.handleInputChange}
        />
        <button>Submit</button>
    </form>
</div>;
*/
