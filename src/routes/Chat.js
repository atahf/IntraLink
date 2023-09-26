import React, { Component } from 'react';
import { decodeJwtToken, getToken } from '../utils/jwtTools';
import { getMyMessagesURL, getSendMessageURL } from '../utils/urlTools';
import { Container, Card, ListGroup, Row, Col } from 'react-bootstrap';
import Loading from '../components/Loading';
import ChatBox from '../components/ChatBox';
import { Scrollbars } from 'react-custom-scrollbars-2';

const PollingInterval = 5000;

class Chat extends Component {

	constructor(props) {
		super(props);
		this.state = {
			chats: [],
			chatNum: 0,
			isLoading: null
		};
	}

	updateChats = (newChats) => {
		this.setState({ chats: newChats });
	};

	updateChatNum = (newChatNum) => {
		this.setState({ chatNum: newChatNum });
	};

	updateIsLoading = (newIsLoading) => {
		this.setState({ isLoading: newIsLoading });
	};

	groupMessagesBySenderReceiver = (messages) => {
		const groupedMessages = [];
	  
		messages.forEach((message) => {
			const group = groupedMessages.find(
			(group) =>
				(group[0].sender === message.sender && group[0].receiver === message.receiver) ||
				(group[0].sender === message.receiver && group[0].receiver === message.sender)
			);
		
			if (group) {
				group.push(message);
			} else {
				groupedMessages.push([message]);
			}
		});
	  
		return groupedMessages;
	};

	findOtherUser = (messages) => {
		const otherUsers = [];
		const userA = decodeJwtToken(getToken()).sub;
		
		messages.forEach((message) => {
			if (message.sender === userA) {
				otherUsers.push(message.receiver);
			} else if (message.receiver === userA) {
				otherUsers.push(message.sender);
			}
		});
		
		// Deduplicate the otherUsers array
		const uniqueOtherUsers = [...new Set(otherUsers)];
		
		return uniqueOtherUsers;
	};

	componentDidMount() {
		this.fetchMessages();
		this.messagePollingInterval = setInterval(this.fetchMessages, PollingInterval);
	}

	componentWillUnmount() {
		clearInterval(this.messagePollingInterval);
	}

	fetchMessages = () => {
		fetch(getMyMessagesURL(), {
			method: 'GET',
			headers: {
					'Content-Type': 'application/json',
					'Authorization': getToken()
			},
		})
				.then(response => response.json())
				.then(jsonData => {
						const newChats = this.groupMessagesBySenderReceiver(jsonData.returnObject);
						this.updateChats(newChats);
				})
				.catch(error => {
						console.log(error);
				});
	};

	sendMessage(receiver, body) {
		const token = getToken();

		fetch(getSendMessageURL(), {
			method: 'POST',
			headers: {
					'Content-Type': 'application/json',
					'Authorization': token
			},
			body: JSON.stringify({
				sender: decodeJwtToken(token).sub,
				receiver: receiver,
				body: body,
				date: new Date()
			})
		})
				.then(response => response.json())
				.then(jsonData => {
						console.log(jsonData);
				})
				.catch(error => {
						console.log(error);
				});
	};

	handleNewConversation() {

	};

	render() {
		const { chats, chatNum, isLoading } = this.state;

		return (
			<div className='message-page'>
				<Container style={{height: '800px'}}>
					<Card style={{height: '800px'}}>
						<Card.Body style={{height: '800px', padding: '25px'}}>
							{isLoading && (
								<Loading />
							)}
							{!isLoading && chats && (<Row>
								<Col xs={6} md={4}>
									<ListGroup style={{height: '750px'}}>
										<Scrollbars>
											{chats.map((chat, index) => {
												return (
													<ListGroup.Item 
														action 
														onClick={() => {this.updateChatNum(index)}} 
														key={index}
														active={index === chatNum}
														style={{borderRadius: '10px', margin: '5px auto', padding: 'auto 20px'}}
													>
														{this.findOtherUser(chat)[0]}
													</ListGroup.Item>
												)
											})}
											<ListGroup.Item
												action 
												onClick={this.handleNewConversation}
												style={{borderRadius: '10px', margin: '5px auto', padding: 'auto 20px'}}
											>
												<i className='fa fa-user' style={{marginRight: '10px'}}></i>
												<span>New Conversation</span>
											</ListGroup.Item>
										</Scrollbars>
									</ListGroup>
								</Col>
								<Col xs={12} md={8}>
									{chats[chatNum] && (
										<ChatBox messages={chats[chatNum]} sendMessage={this.sendMessage} otherUser={this.findOtherUser(chats[chatNum])[0]}/>
									)}
								</Col>
							</Row>)}
						</Card.Body>
					</Card>
				</Container>
			</div>
		);
	}
}

export default Chat;
