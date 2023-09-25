import React, { useState } from 'react';

const EditableText = ({ text, setText }) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <b
            onClick={() => setIsEditing(true)}
            contentEditable={isEditing}
            onBlur={() => setIsEditing(false)}
            onInput={(e) => setText(e.target.textContent)}
        >
            {text}
        </b>
    );
}
 
export default EditableText;