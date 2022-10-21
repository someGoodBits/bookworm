import Accordian from "./Accordian";

const AccordianItem = ({item,onClick}) => {
    if(item.subitems?.length > 0) return <Accordian item={item} onClick={onClick}/>
    return <div className="p-2 text-neutral-500 hover:text-white hover:bg-neutral-700 cursor-pointer" onClick={()=>onClick(item)}>{item.label}</div>;
}
 
export default AccordianItem;