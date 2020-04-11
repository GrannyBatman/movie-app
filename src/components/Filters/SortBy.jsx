import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Select from '../UIComponents/Select'

export default class SortBy extends PureComponent {
	static propTypes = {
		sort_by: PropTypes.string.isRequired,
		onChangeFilters: PropTypes.func.isRequired
	}

	static defaultProps = {
		options: [
			{
				label: 'Популярные по убыванию',
				value: 'popularity.desc'
			},
			{
				label: 'Популярные по возростанию',
				value: 'popularity.asc'
			},
			{
				label: 'Рейтинг по убыванию',
				value: 'vote_average.desc'
			},
			{
				label: 'Рейтинг по возростанию',
				value: 'vote_average.asc'
			}
		]
	}

	render() {
		const { sort_by, onChangeFilters, options } = this.props
		return (
			<Select
				labelText="Сортировать по:"
				id="sort_by"
				name="sort_by"
				onChange={onChangeFilters}
				value={sort_by}
			>
				{options.map(item => (
					<option key={item.value} value={item.value}>
						{item.label}
					</option>
				))}
			</Select>
		)
	}
}
