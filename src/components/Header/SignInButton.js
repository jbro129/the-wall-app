import React, { useState, useContext } from 'react'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { UserAuthContext } from '../../App'

function SignInButton(props) {
	const { setUser, fire } = useContext(UserAuthContext)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = () => {
		const auth = getAuth(fire)
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user
				setUser(user)
				localStorage.setItem('user', JSON.stringify(user))
				// console.log('Logged In!')

				setEmail('')
				setPassword('')
				props.onHide()
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message

				console.log(errorCode + ' ' + errorMessage)

				alert(errorMessage)
			})
	}

	return (
		<Modal {...props} size="lg" centered>
			<Modal.Header closeButton>
				<Modal.Title>Sign In</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
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
						Sign In
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default SignInButton
