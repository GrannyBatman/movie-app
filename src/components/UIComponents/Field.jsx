import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

export default class Field extends Component {
	static propTypes = {
		value: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired
	}

	render() {
		const {
			type,
			labelText,
			id,
			placeholder,
			name,
			value,
			onChange,
			onBlur,
			error
		} = this.props
		return (
			<div className="form-group">
				<label htmlFor={id}>{labelText}</label>
				<input
					type={type}
					className={cx('form-control', {
						'invalid-field': error
					})}
					id={id}
					placeholder={placeholder}
					name={name}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
				/>
				{error && <div className="invalid-feedback">{error}</div>}
			</div>
		)
	}
}
