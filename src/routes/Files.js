import React, { useState, useEffect } from "react";
import Loading from '../components/Loading';
import { Container, Button, Table } from 'react-bootstrap';
import { decodeJwtToken, getToken } from '../utils/jwtTools';
import { getAllFileInfosURL, getFileDeleteURL, getFileURL } from "../utils/urlTools";
import { Scrollbars } from 'react-custom-scrollbars-2';
import FileUploadBox from "../components/FileUploadBox";

const Files = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [addNew, setAddNew] = useState(false);
    const [files, setFiles] = useState(null);

    const handleDownload = (fileName) => {
        setError(null);

        const token = getToken();

        fetch(getFileURL(fileName), {
            method: 'GET',
            headers: {
                'Authorization': token
            },
        })
            .then(response => response.json())
            .then(jsonData => {
                const byteCharacters = atob(jsonData.returnObject.fileData);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray]);
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);

                a.click();

                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                return;
            })
            .catch(error => {
                setError(error);
                return;
            });
    };

    const handleDelete = (id, fileName, username) => {
        setError(null);

        const fileInfoDto = {
            id: id, 
            fileName: fileName, 
            username: username
        };
        const token = getToken();

        fetch(getFileDeleteURL(), {
            method: 'POST',
            body: JSON.stringify(fileInfoDto),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(jsonData => {
                window.location.reload();
                return;
            })
            .catch(error => {
                setError(error);
                return;
            });
    };

    const loadFileInfos = async () => {
        setIsLoading(true);
        setError(null);

        const token = getToken();

        fetch(getAllFileInfosURL(), {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(jsonData => {
                setFiles(jsonData.returnObject);
                setIsLoading(false);
                return;
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
                return;
            });
    };

    useEffect(() => {
        loadFileInfos();
    }, []);

    return (
        <div className='users-page'>
            {isLoading && (
                <Container>
                    <Loading />
                </Container>
            )}
            {!isLoading && files && (<>
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
                    <Container style={{height: '400px', width: '40%', backgroundColor: 'white', borderRadius: '10px', padding: '10px'}}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={() => {setAddNew(true)}} style={{padding: 'auto'}}>
                                <i class="pi pi-cloud-upload" style={{fontSize: "25px"}}></i>
                                &nbsp;&nbsp;
                                <span style={{fontSize: "20px"}}>Upload</span>
                            </Button>
                        </div>
                        <br/>
                        <Scrollbars style={{height: '300px'}}>
                            <Table striped bordered hover variant="light" style={{textAlign: 'center'}}>
                                <thead>
                                    <tr>
                                        <th>File Name</th>
                                        <th>File Owner</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {files.map((file, index) => {
                                        return(
                                            <tr key={index}>
                                                <td>{file.fileName}</td>
                                                <td>{file.username}</td>
                                                <td>
                                                    {decodeJwtToken(getToken()).sub === file.username && (
                                                        <>
                                                            <Button 
                                                                style={{padding: '5px 10px'}} 
                                                                variant="outline-primary" 
                                                                onClick={() => {handleDownload(file.fileName)}}
                                                            >
                                                                <i class="pi pi-cloud-download" style={{fontSize: "25px"}}></i>
                                                            </Button>
                                                            &nbsp;
                                                            <Button 
                                                                style={{padding: '5px 10px'}} 
                                                                variant="outline-success" 
                                                                onClick={() => {}}
                                                            >
                                                                <i class="pi pi-share-alt" style={{fontSize: "25px"}}></i>
                                                            </Button>
                                                            &nbsp;
                                                            <Button 
                                                                style={{padding: '5px 10px'}} 
                                                                variant="outline-danger" 
                                                                onClick={() => {handleDelete(file.id, file.fileName, file.username)}}
                                                            >
                                                                <i class="pi pi-times-circle" style={{fontSize: "25px"}}></i>
                                                            </Button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Scrollbars>
                    </Container>
                )}
            </>)}
        </div>
    );
}
 
export default Files;