import { createRoot } from "react-dom/client";
// import {} from "./welcome/welcome"

const root = createRoot(document.querySelector("main"));
root.render(<HelloWorld />);

function HelloWorld() {
    return <div>Hello, World!</div>;
}
