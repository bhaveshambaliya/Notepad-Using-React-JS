const Button = (props: any) => {
    const { name, onClick, type } = props;
    return (
        <button type={type} onClick={onClick} className="btn">
            {name}
        </button>
    );
};
Button.defaultProps = {
    name: "Submit",
    type: "button",
    onClick: () => console.log("Submit button call"),
};

export default Button;
