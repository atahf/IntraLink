import React, { Component } from 'react';
import { decodeJwtToken, getToken } from '../utils/jwtTools';
import { getMyMessagesURL, getSendMessageURL } from '../utils/urlTools';
import { Container, Card, Pagination } from 'react-bootstrap';
import Loading from '../components/Loading';
import ChatBox from '../components/ChatBox';

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
						console.log(jsonData);
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

	render() {
		const { chats, chatNum, isLoading } = this.state;

		return (
			<Container style={{height: '100%'}}>
				<Card style={{height: '100%'}}>
					<Card.Body>
						{isLoading && (
							<Loading />
						)}
						{!isLoading && chats && (<>
							{chats[chatNum] && (
								<ChatBox messages={chats[chatNum]} sendMessage={this.sendMessage} otherUser={this.findOtherUser(chats[chatNum])}/>
							)}
							<Pagination style={{margin: '15px', display: 'flex', justifyContent: 'center' }}>
								<Pagination.First onClick={() => this.updateChatNum(0)} disabled={chatNum === 0}/>
								<Pagination.Prev onClick={() => this.updateChatNum(chatNum-1)} disabled={chatNum-1 < 0}/>

								{chats.map((msg, index) => {
									const startIndex = Math.max(0, chatNum - 2);
									const endIndex = Math.min(chats.length, chatNum + 3);

									if (index >= startIndex && index < endIndex) {
										return (
											<Pagination.Item
												key={index}
												active={index === chatNum}
												onClick={() => this.updateChatNum(index)}
											>
												{index+1}
											</Pagination.Item>
										);
									}

									return null;
								})}

								<Pagination.Next onClick={() => this.updateChatNum(chatNum+1)} disabled={chatNum+1 > chats.length-1}/>
								<Pagination.Last onClick={() => this.updateChatNum(chats.length-1)} disabled={chatNum === chats.length-1}/>
							</Pagination>
						</>)}
					</Card.Body>
				</Card>
			</Container>
		);
	}
}

export default Chat;
