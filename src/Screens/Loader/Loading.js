import React from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loading = () => {
    const centerPosition = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    };
    return (
        <div style={centerPosition}>
            <Loader
                type="Oval"
                color="#b9770e"
                height={50}
                width={50}
            />
        </div>
    )
}

export default Loading
