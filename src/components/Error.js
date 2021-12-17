const Error = ({children}) => {
    return (
        <div
            style={{
                width: "96%",
                padding: 10,
                marginBottom: 10,
                borderRadius: 4,
                backgroundColor: "#9c1458",
                textAlign: "center",
                color: "white",
                textTransform: "capitalize",
                justifyContent: "center"
            }}
        >
            {children}
        </div>
    );
}

export default Error;