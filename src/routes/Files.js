import React from "react";
import FileUploadBox from "../components/FileUploadBox";

const Files = () => {
    return (
        <div className='users-page'>
            <FileUploadBox maxSize={15728640} style={{ width: '50%' }}/>
        </div>
    );
}
 
export default Files;