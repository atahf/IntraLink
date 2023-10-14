import React from "react";
import FileUploadBox from "../components/FileUploadBox";

const Files = () => {
    return (
        <div>
            <FileUploadBox maxSize={15} style={{ width: '50%' }}/>
        </div>
    );
}
 
export default Files;