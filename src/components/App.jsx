import React from 'react'
import Filters from './Filters/Filters'
import MoviesList from './Movies/MoviesList'
import ResetFilters from './ResetFilters'

export default class App extends React.Component {
	state = {
		filters: {
			sort_by: 'popularity.desc',
			primary_release_year: '',
			with_genres: []
		},
		page: 1,
		total_pages: 10
	}

	onChangeFilters = ({ target: { name, value } }) => {
		this.setState(state => ({
			filters: {
				...state.filters,
				[name]: value
			}
		}))
	}

	onChangeParam = (key, value) => {
		this.setState({
			[key]: value
		})
	}

	onResetFilters = () => {
		this.setState({
			filters: {
				sort_by: 'popularity.desc',
				primary_release_year: '',
				with_genres: []
			},
			page: 1,
			total_pages: 10
		})
	}

	render() {
		const { filters, page } = this.state
		return (
			<div className="container">
				<div className="row mt-4">
					<div className="col-4">
						<div className="card" style={{ width: '100%' }}>
							<div className="card-body">
								<h3>Фильтры:</h3>
								<Filters
									page={page}
									filters={filters}
									onChangeFilters={this.onChangeFilters}
									onChangeParam={this.onChangeParam}
									total_pages={this.state.total_pages}
								/>
								<ResetFilters onResetFilters={this.onResetFilters} />
							</div>
						</div>
					</div>
					<div className="col-8">
						<MoviesList
							filters={filters}
							page={page}
							onChangeParam={this.onChangeParam}
							total_pages={this.state.total_pages}
						/>
					</div>
				</div>
			</div>
		)
	}
}
