import React, { useContext, useEffect } from 'react'
import WallCard from './WallCard'
import { CardColumns, Spinner, Row } from 'react-bootstrap'

import { WallsContext } from '../../App'

function Wall() {
	const { wallsList, setWallsList } = useContext(WallsContext)

	useEffect(() => {
		fetch('https://jonahs-wall-api.web.app/wall')
			.then((response) => response.json())
			.then((data) => {
				setWallsList(data)
				// console.log(data)
			})
			.catch()
	}, [])

	return (
		<CardColumns>
			<Row>
				{!wallsList ? (
					<Spinner animation="border" role="status"></Spinner>
				) : (
					wallsList.map((one) => {
						return <WallCard post={one} />
					})
				)}
			</Row>
		</CardColumns>
	)
}

export default Wall
