import React, { useState, useContext } from 'react'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	updateCurrentUser,
} from 'firebase/auth'

import { UserAuthContext } from '../../App'

function SignUpButton(props) {
	const { user, setUser, fire } = useContext(UserAuthContext)

	const [username, setUserName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = () => {
		// console.log(username, email, password)

		const auth = getAuth(fire)
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user
				// console.log(user)

				// add the displayName to the user
				updateProfile(user, {
					displayName: username,
				})
					.then(() => {
						setUser(user)
						// keep user signin even if the page is refreshed
						localStorage.setItem('user', JSON.stringify(user))
						
						// add the displayName to the user
						updateCurrentUser(auth, user)
						// console.log('Signed Up!')

						setUserName('')
						setEmail('')
						setPassword('')
						props.onHide()
					})
					.catch((error) => {
						const errorCode = error.code
						const errorMessage = error.message

						console.log(errorCode + ' ' + errorMessage)
					})
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message

				console.log(errorCode + ' ' + errorMessage)

				alert(errorMessage)
			})

		// setUserName('')
		// setEmail('')
		// setPassword('')
		// props.onHide()
	}

	return (
		<Modal {...props} size="lg" centered>
			<Modal.Header closeButton>
				<Modal.Title>Sign Up</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group
						as={Row}
						className="mb-3"
						controlId="formPlaintextUsername"
					>
						<Form.Label column sm="2">
							Username
						</Form.Label>
						<Col sm="10">
							<Form.Control
								placeholder="Username"
								value={username}
								onChange={(e) => setUserName(e.target.value)}
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
						<Form.Label column sm="2">
							Email
						</Form.Label>
						<Col sm="10">
							<Form.Control
								placeholder="email@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Col>
					</Form.Group>

					<Form.Group
						as={Row}
						className="mb-3"
						controlId="formPlaintextPassword"
					>
						<Form.Label column sm="2">
							Password
						</Form.Label>
						<Col sm="10">
							<Form.Control
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Col>
					</Form.Group>
					<Button className="submitBtn" onClick={() => handleSubmit()}>
						Sign Up
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default SignUpButton
