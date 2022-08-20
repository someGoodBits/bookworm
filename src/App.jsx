import { BrowserRouter, Routes, Route } from "react-router-dom";
// components
import Dashboard from "./pages/Dashboard";
import Read from "./pages/Read";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/read" element={<Read />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
