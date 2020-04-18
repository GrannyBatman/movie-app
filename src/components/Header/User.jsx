import React, { Component } from 'react'

export default class User extends Component {
	render() {
		return (
			<div>
				<img
					className="rounded-circle"
					src={`https://www.gravatar.com/avatar/${this.props.avatar.gravatar.hash}?s=40`}
					alt="user_avatar"
				/>
				<span className="ml-3 text-white">{this.props.username}</span>
			</div>
		)
	}
}
