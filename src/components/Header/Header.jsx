import React from 'react'
import Login from './Login/Login'
import User from './User'

class Header extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-dark bg-primary">
				<div className="container">
					<ul className="navbar-nav">
						<li className="nav-item active">
							{/* eslint-disable-next-line */}
							<a className="nav-link">Home</a>
						</li>
					</ul>
					{this.props.user ? (
						<User {...this.props.user} />
					) : (
						<Login
							onChangeParam={this.props.onChangeParam}
							updateCookie={this.props.updateCookie}
						/>
					)}
				</div>
			</nav>
		)
	}
}

export default Header
