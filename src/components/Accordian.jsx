import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import AccordianItem from "./AccordianItem";
import {ChevronDown} from "tabler-icons-react";
import gsap from "gsap";

const Accordian = ({item,onClick}) => {
    const [isOpen, setIsOpen] = useState(true);
    const optionRef = useRef();

    useEffect(()=>{
        if(!optionRef.current) return;
        if(isOpen){
            gsap.to(optionRef.current,{height:0,pointerEvents:"none",duration:0.2});
        } else {
            gsap.to(optionRef.current,{height:"auto",pointerEvents:"all",duration:0.2});
        }
    },[isOpen])

    if(item.isRoot) 
        return (<div>{item.subitems.map((itm,i) => <AccordianItem key={i} item={itm} onClick={onClick}/>)}</div>)

    if(item.subitems?.length == 0) 
        return <AccordianItem item={item} onClick={onClick}/>

    return (
        <div className="select-none">
            <div className="flex p-2 text-neutral-500 hover:text-white hover:bg-neutral-700 cursor-pointer" onClick={()=>setIsOpen(s=>!s)}>
                <div className="flex-1">
                    {item.label}
                </div>
                <div className={classNames("px-2 flex items-center justify-center transition-all duration-200",{"rotate-180":!isOpen})}>
                    <ChevronDown size={24} stroke="currentColor"/>
                </div>
            </div>
            <div ref={optionRef} className="ml-4 overflow-hidden">{item.subitems.map((itm,i) => <AccordianItem key={i} item={itm} onClick={onClick}/>)}</div>
        </div>
    );
}
 
export default Accordian;