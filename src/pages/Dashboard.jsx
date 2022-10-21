import {ReactComponent as Worm} from "../assets/worm.svg";
import Button from "../components/Button";
import {Book} from "tabler-icons-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();

    function doOpenBook(){
        let fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".epub";
        fileInput.click();
        
        function onFileChange(event){
            console.log(event.target.files);
            const file = event.target.files[0] ;
            if(file){
                navigate("/read",{state:{file}});
            }
        }

        fileInput.addEventListener("change",onFileChange);
        return ()=>{
            fileInput.removeEventListener("change",onFileChange);
        }
    }

    return ( 
        <div className="w-screen h-screen bg-neutral-900 flex flex-col items-center justify-center">
            <Worm height={128}/>
            <div className="my-5">
                <div className="text-white text-4xl font-bold">Bookworm</div>
                <div className="text-neutral-400">A lightweight ebook reader</div>
            </div>      
            <Button className="h-12 pl-12" type="primary" onClick={doOpenBook}> 
                <div className="absolute h-12 w-12 left-0 top-0 flex items-center justify-center border-r-2 border-r-primary-900">
                    <Book size={32} color="#fff" />
                </div>
                <span className="px-4">OPEN BOOK</span>
            </Button>
        </div> 
    );
}
 
export default Dashboard;