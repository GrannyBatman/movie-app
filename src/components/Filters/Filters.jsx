import React from 'react'
import SortBy from './SortBy'
import Pagination from './Pagination'
import ReleaseYear from './ReleaseYear'
import Genres from './Genres'

export default class Filters extends React.Component {
	render() {
		const {
			filters: { sort_by, primary_release_year, with_genres },
			page,
			onChangeFilters,
			onChangeParam,
			total_pages
		} = this.props
		return (
			<form className="mb-3">
				<SortBy onChangeFilters={onChangeFilters} sort_by={sort_by} />
				<ReleaseYear
					onChangeFilters={onChangeFilters}
					primary_release_year={primary_release_year}
				/>
				<Genres onChangeFilters={onChangeFilters} with_genres={with_genres} />
				<Pagination onChangeParam={onChangeParam} page={page} total_pages={total_pages} />
			</form>
		)
	}
}
