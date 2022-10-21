
const ProgressBar = ({progress}) => {
    return ( 
        <div className="relative w-full h-2 bg-neutral-800">
            <div className="relative w-full h-full bg-primary-500 transition-all duration-150" style={{
                transform: `translateX(-${(1-progress)*100}%)`
            }}></div>
        </div> 
    );
}
 
export default ProgressBar;