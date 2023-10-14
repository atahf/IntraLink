import React, { useState, useEffect } from "react";
import { Container, Button } from 'react-bootstrap';
import FileUploadBox from "../components/FileUploadBox";

const Files = () => {
    const [addNew, setAddNew] = useState(false);

    return (
        <div className='users-page'>
            {addNew && (
                <Container>
                    <FileUploadBox maxSize={10485760} style={{ width: '100%' }}/>
                    <br/>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="danger" onClick={() => setAddNew(false)}>
                            Cancel Upload
                        </Button>
                    </div>
                </Container>
            )}
            {!addNew && (
                <Container>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={() => {setAddNew(true)}}>Upload New File</Button>
                    </div>
                </Container>
            )}
        </div>
    );
}
 
export default Files;