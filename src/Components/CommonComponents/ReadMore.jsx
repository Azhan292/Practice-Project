import React, { useState } from 'react';
import './readmore.style.css';

const ReadMore = ({children, maxCharacterCount}) => {
    const text = children;
    const [isTruncated, setIsTruncated] = useState(true);
    const resultString = isTruncated ? text.slice(0, maxCharacterCount) : text;

    return (
        <p className="small__text">
            {resultString}
            {text.length > 200 ? <button className="read__more" onClick={() => setIsTruncated(!isTruncated)}>Read {isTruncated ? "More" : "Less"}</button> : null}
            
        </p>
    )
}

export default ReadMore;