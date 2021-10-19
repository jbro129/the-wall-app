import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { UserAuthContext } from '../../App'

import SignInButton from './SignInButton'
import PostNew from '../PostNew'
import SignUpButton from './SignUpButton'

function Header() {
	const { user, setUser } = useContext(UserAuthContext)
	const [showPostNew, setShowPostNew] = useState(false)
	const [showSignIn, setShowSignIn] = useState(false)
	const [showSignUp, setShowSignUp] = useState(false)

	useEffect(() => {
		// keep user signin even if the page is refreshed
		const localUser = localStorage.getItem('user')
		setUser(localUser ? JSON.parse(localUser) : '')
	}, [])

	return (
		<Fragment>
			<Navbar className="justify-content-between">
				<Navbar.Brand style={{ marginLeft: '1rem' }}>
					The Brick Wall
				</Navbar.Brand>
				<Nav>
					{user && (
						<button
							className="post-button"
							onClick={() => setShowPostNew(true)}
						>
							Make Post as {user.displayName}
						</button>
					)}
					{!user && (
						<button
							className="signup-button"
							onClick={() => setShowSignUp(true)}
						>
							Sign Up
						</button>
					)}

					<button
						className="signin-button"
						onClick={() => {
							if (user) {
								setUser('')
								localStorage.removeItem('user')
							} else {
								setShowSignIn(true)
							}
						}}
					>
						{user ? 'Sign Out' : 'Sign In'}
					</button>
				</Nav>
			</Navbar>

			<SignInButton show={showSignIn} onHide={() => setShowSignIn(false)} />
			<SignUpButton show={showSignUp} onHide={() => setShowSignUp(false)} />
			<PostNew show={showPostNew} onHide={() => setShowPostNew(false)} />
		</Fragment>
	)
}

export default Header
