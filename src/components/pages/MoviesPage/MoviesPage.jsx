import React from 'react'
import Filters from '../../Filters/Filters'
import MoviesList from '../../Movies/MoviesList'
import ResetFilters from '../../ResetFilters'
import CallApi from '../../../api/api'

export default class MoviesPage extends React.Component {
	state = {
		filters: {
			sort_by: 'popularity.desc',
			primary_release_year: '',
			with_genres: []
		},
		page: 1,
		total_pages: '',
		favoriteMovies: [],
		watchlistMovies: []
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
			total_pages: ''
		})
	}

	async getFavoriteMovies() {
		const favoriteMovies = await (
			await CallApi.get(`/account/${this.state.user.id}/favorite/movies`, {
				params: {
					session_id: this.state.session_id,
					language: 'ru-RU'
				}
			})
		).json()
		this.setState({
			favoriteMovies: favoriteMovies.results
		})
	}

	async getWatchlistMovies() {
		const watchlistMovies = await (
			await CallApi.get(`/account/${this.state.user.id}/watchlist/movies`, {
				params: {
					session_id: this.state.session_id,
					language: 'ru-RU'
				}
			})
		).json()
		this.setState({
			watchlistMovies: watchlistMovies.results
		})
	}

	render() {
		const { filters, page, total_pages } = this.state
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
									total_pages={total_pages}
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
							total_pages={total_pages}
						/>
					</div>
				</div>
			</div>
		)
	}
}
