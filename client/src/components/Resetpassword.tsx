import { useState, FormEvent } from "react";

interface ResetPasswordState {
    email?: string;
    success?: string;
    error?: string;
}

const ResetPassword: React.FC = () => {
    const [state, setState] = useState<ResetPasswordState>({
        email: "",
        success: "",
        error: "",
    });

    const handleInputChange = (evt) => {
        const property = evt.target.name;
        setState({ ...state, [property]: evt.target.value });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch("/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: state.email,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    setState({
                        ...state,
                        success: "Password reset instructions sent!",
                    });
                } else {
                    setState({ ...state, error: "Error resetting password" });
                }
            });
    };

    return (
        <form className="reset-password" onSubmit={handleSubmit}>
            <div className="success-message">{state.success}</div>
            <div className="error-message">{state.error}</div>
            <label>
                Email:
                <input type="email" name="email" onChange={handleInputChange} />
            </label>
            <br />
            <button type="submit">Send reset instructions</button>
        </form>
    );
};

export default ResetPassword;
