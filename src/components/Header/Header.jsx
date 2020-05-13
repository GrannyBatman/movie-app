import React from 'react'
import Login from './Login/Login'
import User from './User'
import { Link } from 'react-router-dom'

class Header extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-dark bg-primary">
				<div className="container">
					<ul className="navbar-nav">
						<li className="nav-item active">
							<Link to="/" className="nav-link">
								Home
							</Link>
						</li>
					</ul>
					{this.props.user ? <User onLogOut={this.props.onLogOut} /> : <Login />}
				</div>
			</nav>
		)
	}
}

export default Header
