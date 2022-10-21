import classNames from "classnames";

const buttonTypes = {
    default : "text-neutral-300 bg-neutral-800 hover:text-white hover:bg-neutral-700",
    primary : "text-white bg-primary-500 hover:bg-primary-700",
    display : "text-white bg-primary-500 hover:bg-primary-700",
    icon : "flex items-center justify-center text-neutral-300 bg-neutral-800 hover:text-white hover:bg-neutral-700"
}

const buttonSizes = {
    small : "px-2 py-1 text-sm",
    medium : "px-4 py-2 text-xl",
    large : "px-5 py-3 text-2xl",
    default : ""
}

const Button = ({children,className,disabled,type="default",size="default",onClick=()=>{}}) => {

    return ( 
        <button className={classNames(
            "outline-none relative flex items-center cursor-pointer font-bold",
            buttonSizes[size] || buttonSizes["default"],
            buttonTypes[type] || buttonTypes["default"],
            className,
        )} 
        onClick={onClick}
        disabled={disabled}>
            {children}
        </button> 
    );
}

export default Button;