import React, { PureComponent } from 'react'
import Select from '../UIComponents/Select'

const createYearsList = () => {
	let startYear = 1950,
		endYear = 2025

	return Array.from(new Array(endYear + 1 - startYear), (value, index) => endYear - index)
}
const yearsList = createYearsList()

export default class ReleaseYear extends PureComponent {
	render() {
		return (
			<Select
				labelText="Год выпуска:"
				id="releaseYear"
				name="primary_release_year"
				onChange={this.props.onChangeFilters}
				value={this.props.primary_release_year}
			>
				<option key="year-0" value="">
					Выберите год
				</option>
				{yearsList.map(item => (
					<option key={`year-${item}`} value={item}>
						{item}
					</option>
				))}
			</Select>
		)
	}
}
