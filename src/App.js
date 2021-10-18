import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import React, { useState, createContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { initializeApp } from 'firebase/app'

import Header from './components/Header'
import Footer from './components/Footer'
import Wall from './components/Wall'

import Credentials from './secrets.json'

export const UserAuthContext = createContext(null)
export const WallsContext = createContext(null)

const firebase = initializeApp(Credentials)

function App() {
	const [fire, setFirebase] = useState(null)
	const [user, setUser] = useState(null)
	const [wallsList, setWallsList] = useState([])

	useEffect(() => {
		setFirebase(firebase)
	}, [])

	return (
		<WallsContext.Provider value={{ wallsList, setWallsList }}>
			<UserAuthContext.Provider value={{ user, setUser, fire }}>
				<Header />
				<Container>
					<Wall />
				</Container>
				<Footer />
			</UserAuthContext.Provider>
		</WallsContext.Provider>
	)
}

export default App
