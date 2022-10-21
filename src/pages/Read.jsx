import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BW_SFT_EPUB } from "../data/supportedFileTypes";
import {Reader} from "../features/reader";
import isFile from "../utility/isFile";

const Read = () => {

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
        <div className="w-screen h-screen bg-neutral-900">
            {File && <Reader file={File} fileType={BW_SFT_EPUB} />}
        </div>
    );
};

export default Read;
