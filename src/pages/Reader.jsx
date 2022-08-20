import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import isFile from "../utility/isFile";

const Reader = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [File, setFile] = useState(null);

    useEffect(()=>{
        if(!isFile(location.state.file)) {
            console.log("!File");
            navigate("/");
        }
        setFile(location.state.file);
    },[location])

    return (
        <div className="w-screen h-screen bg-neutral-900"></div>
    );
};

export default Reader;
