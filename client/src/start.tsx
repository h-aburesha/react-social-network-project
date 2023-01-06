import { createRoot } from "react-dom/client";
import { App } from "./app/app";
import { Welcome } from "./components/Welcome";

const root = createRoot(document.querySelector("main"));

fetch("/user/id.json")
    .then((res) => res.json())
    .then((data) => {
        if (data.userId) {
            root.render(<App />);
        } else {
            root.render(<Welcome />);
        }
    });
