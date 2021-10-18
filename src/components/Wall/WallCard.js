import React from 'react'
import { Col, Media, Card, Image } from 'react-bootstrap'

function WallCard({ post }) {
	return (
		<Col md={true}>
			<Card>
				<Card.Body>
					<Card.Title className="text-center">{post.text}</Card.Title>
				</Card.Body>
				<Card.Body>
					<Card.Text>
						<Media>
							<Media.Body>{post.displayName}</Media.Body>
						</Media>
					</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	)
}

export default WallCard
