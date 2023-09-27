import React, { Component } from 'react';
import { decodeJwtToken, getToken } from '../utils/jwtTools';
import { getMyMessagesURL, getSendMessageURL, getAllUsersPublicDataURL } from '../utils/urlTools';
import { Container, Card, ListGroup, Row, Col, Modal } from 'react-bootstrap';
import Loading from '../components/Loading';
import ChatBox from '../components/ChatBox';
import { Scrollbars } from 'react-custom-scrollbars-2';

const PollingInterval = 5000;

class Chat extends Component {

	constructor(props) {
		super(props);
		this.state = {
			chats: [],
			users: [],
			chatNum: 0,
			isLoading: null,
			showModal: false,
			searchTerm: '',
			newConversation: null
		};
	}

	handleSearch = event => {
		this.setState({ searchTerm: event.target.value });
	};

	updateChats = (newChats) => {
		this.setState({ chats: newChats });
	};

	updateUsers = (newUsers) => {
		this.setState({ users: newUsers });
	};

	updateChatNum = (newChatNum) => {
		this.setState({ chatNum: newChatNum });
	};

	updateIsLoading = (newIsLoading) => {
		this.setState({ isLoading: newIsLoading });
	};

	updateNewConversation = (NewConversation) => {
		this.setState({ newConversation: NewConversation });
	};

	updateShowModal = (newShowModal) => {
		this.setState({ showModal: newShowModal });
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
		this.fetchUsers();
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
						console.log(newChats);
						this.updateChats(newChats);
				})
				.catch(error => {
						console.log(error);
				});
	};

	fetchUsers = () => {
		fetch(getAllUsersPublicDataURL(), {
			method: 'GET',
			headers: {
					'Content-Type': 'application/json',
					'Authorization': getToken()
			},
		})
				.then(response => response.json())
				.then(jsonData => {
						this.updateUsers(jsonData.returnObject);
				})
				.catch(error => {
						console.log(error);
				});
	}

	sendMessage = (receiver, body) => {
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

	createConversation = (user) => {
		this.updateNewConversation(
			<ChatBox messages={[]} sendMessage={this.sendMessage} otherUser={user.username}/>
		)
		this.updateShowModal(false);
	};

	render() {
		const { users, chats, chatNum, isLoading, showModal, searchTerm, newConversation } = this.state;

		const filteredList = users.filter(item => item.username.includes(searchTerm) || `${item.firstName} ${item.lastName}`.includes(searchTerm) || item.email.includes(searchTerm));

		return (
			<div className='message-page'>
				<Modal 
					show={showModal} 
					onHide={() => this.updateShowModal(false)}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title>Users</Modal.Title>
					</Modal.Header>
					<Modal.Body style={{height: '350px'}}>
						<input
							type="text"
							placeholder="Search..."
							value={this.state.searchTerm}
							onChange={this.handleSearch}
						/>
						<ListGroup style={{height: '300px'}}>
							<Scrollbars>
								{filteredList.map((user, index) => {
									const myUsername = decodeJwtToken(getToken()).sub;
									if(user.username !== myUsername) {
										return(
											<ListGroup.Item key={index} onClick={() => this.createConversation(user)}>
												{user.username + ' ' + user.firstName + ' ' + user.lastName + ' ' + user.email}
											</ListGroup.Item>
										);
									}
								})}
							</Scrollbars>
						</ListGroup>
					</Modal.Body>
				</Modal>

				<Container style={{height: '800px'}}>
					<Card style={{height: '800px'}}>
						<Card.Body style={{height: '800px', padding: '25px'}}>
							{isLoading && (
								<Loading />
							)}
							{!isLoading && chats && (
								<Row>
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
												{users && (
													<ListGroup.Item
														action 
														onClick={() => this.updateShowModal(true)}
														style={{borderRadius: '10px', margin: '5px auto', padding: 'auto 20px'}}
													>
														<i className='fa fa-user-plus' style={{marginRight: '10px'}}></i>
														<span>New Conversation</span>
													</ListGroup.Item>
												)}
											</Scrollbars>
										</ListGroup>
									</Col>
									<Col xs={12} md={8}>
										{!newConversation && chats[chatNum] && (
											<ChatBox messages={chats[chatNum]} sendMessage={this.sendMessage} otherUser={this.findOtherUser(chats[chatNum])[0]}/>
										)}
										{newConversation}
									</Col>
								</Row>
							)}
						</Card.Body>
					</Card>
				</Container>
			</div>
		);
	}
}

export default Chat;
