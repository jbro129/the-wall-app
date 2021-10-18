import React, { useState, useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'

import { UserAuthContext, WallsContext } from '../../App'

function PostNew(props) {
	const { setWallsList } = useContext(WallsContext)
	const { user } = useContext(UserAuthContext)
	const [newText, setNewText] = useState('')

	const handleSubmit = () => {
		if (newText !== '') {
			const newWallPost = {
				text: newText,
				uid: user.uid,
				displayName: user.displayName,
			}
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newWallPost),
			}

			fetch('https://jonahs-wall-api.web.app/wall', options)
				.then((response) => response.json())
				.then((data) => {
					setNewText('')
					props.onHide()
					// console.log(data)
					setWallsList(data)
				})
				.catch((err) => console.log(err))
		} else {
			alert('Text is empty')
		}
	}

	return (
		<Modal {...props} size="lg" centered>
			<Modal.Header closeButton>
				<Modal.Title>Post to Wall</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<textarea
					value={newText}
					onChange={(e) => setNewText(e.target.value)}
					rows="3"
					cols="40"
					placeholder="Your wall post here..."
				></textarea>
			</Modal.Body>
			<Modal.Footer>
				<Button className="submitBtn" onClick={() => handleSubmit()}>
					Post
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default PostNew
