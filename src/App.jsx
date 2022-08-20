import { BrowserRouter, Routes, Route } from "react-router-dom";
// components
import Dashboard from "./pages/Dashboard";
import Reader from "./pages/Reader";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/read" element={<Reader />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
