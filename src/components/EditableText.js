import React, { useState } from 'react';

const EditableText = ({ text, setText }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setText(e.target.textContent);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    return (
        <b
            onDoubleClick={handleDoubleClick}
            contentEditable={isEditing}
            onBlur={handleBlur}
            onInput={handleChange}
        >
            {text}
        </b>
    );
}
 
export default EditableText;