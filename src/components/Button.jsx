import classNames from "classnames";

const buttonTypes = {
    default : "text-gray-300 bg-gray-800 hover:text-white hover:bg-gray-700",
    primary : "text-white bg-primary-500 hover:bg-primary-700",
    display : "text-white bg-primary-500 hover:bg-primary-700"
}

const buttonSizes = {
    small : "px-2 py-1 text-sm",
    medium : "px-4 py-2 text-xl",
    large : "px-5 py-3 text-2xl",
    default : "px-4 py-2 text-xl"
}

const Button = ({children,className,disabled,type="default",size="default",onClick=()=>{}}) => {

    return ( 
        <button className={classNames(
            className,
            "relative flex items-center cursor-pointer font-bold",
            buttonSizes[size] || buttonSizes["default"],
            buttonTypes[type] || buttonTypes["default"],
        )} 
        onClick={onClick}
        disabled={disabled}>
            {children}
        </button> 
    );
}

export default Button;