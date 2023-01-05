import { ChangeEvent, Component, FormEvent } from "react";

// interface Friend {
//     firstname: string,
//     lastname: string,
// }

export class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
        };
    }

    handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();
        console.log("evt: ", evt);
        //    fetch("/") {}
    };

    handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        evt.preventDefault();
        console.log("evt: ", evt.target.name);
        const property = evt.target.name;
        this.setState({ [property]: evt.target.value });
    };

    // customFunction = (Friends: Friend[]) => {

    // }

    render = () => {
        return (
            <div>
                <h1>Welcome</h1>

                {/* {LogoComponent}*/}

                <form onSubmit={this.handleSubmit}>
                    <label>Firstname: </label>
                    <input name="firstname" type="text"></input>
                </form>
            </div>
        );
    };
}
