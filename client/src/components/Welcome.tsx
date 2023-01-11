import { LoginForm } from "./LoginForm";
import { Logo } from "./Logocomponent";
import { Registration } from "./Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetPassword from "./Resetpassword";

export function Welcome() {
    return (
        <div>
            <Logo />

            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<LoginForm />} />

                        <Route
                            path="/password/reset/start"
                            element={<ResetPassword />}
                        />
                        <Route path="/" element={<Registration />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}
