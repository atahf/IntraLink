import React, {useState, useEffect} from "react";
import { Container, Card, Pagination, Button } from 'react-bootstrap';
import { getToken, hasPermission } from '../utils/jwtTools';
import { getAllLogsURL } from '../utils/urlTools';
import Loading from '../components/Loading';

const Logs = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [logs, setLogs] = useState(null);
    const [logNum, setlogNum] = useState(0);

    const loadLogs = async () => {
        setIsLoading(true);
        setError(null);
        const token = getToken();

        fetch(getAllLogsURL(), {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(jsonData => {
                setLogs(jsonData.returnObject);
                console.log(jsonData.returnObject);
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
        loadLogs();
    }, []);

    return (
        <div className='users-page'>
            <Card style={{height: "35%", width: "45%"}}>
                {isLoading && (
                    <Loading />
                )}
                {!isLoading && logs && (<>
                    {logs[logNum] && (
                        <Card.Body style={{ position: 'relative' }}>
                            <Card.Text style={{ padding: '0px 40px', textTransform: 'capitalize' }}>
                                <Container style={{padding: '15px'}}>
                                    Submitted By: {logs[logNum].username} <br />
                                    Submission Date: {logs[logNum].submissionDate.replace("T", " ")} <br />
                                    Log ID: {logs[logNum].id} <br />
                                    {logs[logNum].description}
                                </Container>
                            </Card.Text>
                        </Card.Body>
                    )}
                    <Pagination style={{margin: '15px', display: 'flex', justifyContent: 'center' }}>
                        <Pagination.First onClick={() => {setlogNum(0)}} disabled={logNum === 0}/>
                        <Pagination.Prev onClick={() => {setlogNum(logNum-1)}} disabled={logNum-1 < 0}/>

                        {logs.map((log, index) => {
                            const startIndex = Math.max(0, logNum - 3);
                            const endIndex = Math.min(logs.length, logNum + 4);

                            if (index >= startIndex && index < endIndex) {
                                return (
                                    <Pagination.Item
                                        key={index}
                                        active={index === logNum}
                                        onClick={() => setlogNum(index)}
                                    >
                                        {index+1}
                                    </Pagination.Item>
                                );
                            }

                            return null;
                        })}

                        <Pagination.Next onClick={() => {setlogNum(logNum+1)}} disabled={logNum+1 > logs.length-1}/>
                        <Pagination.Last onClick={() => {setlogNum(logs.length-1)}} disabled={logNum === logs.length-1}/>
                    </Pagination>
                </>)}
            </Card>
        </div>
    );
}
 
export default Logs;