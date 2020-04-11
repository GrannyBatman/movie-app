import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Select extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired
	}

	render() {
		const { id, name, onChange, value, labelText, children } = this.props
		return (
			<div className="form-group">
				<label htmlFor="sort_by">{labelText}</label>
				<select
					className="form-control"
					id={id}
					name={name}
					onChange={onChange}
					value={value}
				>
					{children}
				</select>
			</div>
		)
	}
}
