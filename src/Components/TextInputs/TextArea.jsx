import './inputfield.style.css';
import './textarea.style.css';

const TextArea = ({ placeholder, value, handleChange, name }) => {
    return (
        <div id="text__area">
            <textarea placeholder={placeholder} value={value} name={name} onChange={handleChange} ></textarea>
        </div>
    )
}

export default TextArea