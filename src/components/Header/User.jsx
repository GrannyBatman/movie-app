import React, { Component } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import CallApi from './../../api/api'
import AppContextHOC from './../HOC/AppContextHOC'

class UserMenu extends Component {
	state = {
		dropdownOpen: false
	}

	toggleDropdown = () => {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}))
	}

	async logOut() {
		try {
			const logOut = await (
				await CallApi.delete('/authentication/session', {
					body: {
						session_id: this.props.session_id
					}
				})
			).json()

			if (logOut.status_code) {
				throw new Error(logOut.status_message)
			}

			this.props.onLogOut()
		} catch (error) {
			console.log(`logOut: ${error.message}`)
		}
	}

	render() {
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
				<DropdownToggle tag="div" caret>
					<img
						className="rounded-circle"
						src={`https://www.gravatar.com/avatar/${this.props.user.avatar.gravatar.hash}?s=40`}
						alt="user_avatar"
					/>
					<span className="ml-2 mr-1 text-white">{this.props.user.username}</span>
				</DropdownToggle>
				<DropdownMenu>
					<DropdownItem onClick={this.logOut.bind(this)}>Выход</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		)
	}
}

export default AppContextHOC(UserMenu)
