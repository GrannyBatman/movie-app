import React, { Component } from 'react'
import MovieItem from './MovieItem'
import { API_URL, API_KEY_3 } from '../../api/api'

export default class MovieList extends Component {
	constructor() {
		super()

		this.state = {
			movies: []
		}
	}

	async getMovies({
		filters: { sort_by, primary_release_year, with_genres } = this.props.filters,
		page = this.props.page
	}) {
		try {
			const genres = with_genres.join('%7C') // %7C - знак ИЛИ (пример: драма или боевик или вестерн)
			const response = await fetch(
				`${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${primary_release_year}&with_genres=${genres}`
			)
			const data = await response.json()

			if (this.props.total_pages !== data.total_pages) {
				this.props.onChangeParam('total_pages', data.total_pages)
			}

			if (response.status === 200) {
				this.setState({
					movies: data.results
				})
			}
		} catch (error) {
			console.log(error)
		}
	}

	componentDidMount() {
		this.getMovies({
			filters: this.props.filters,
			page: this.props.page
		})
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.filters.sort_by !== prevProps.filters.sort_by ||
			this.props.filters.primary_release_year !== prevProps.filters.primary_release_year ||
			this.props.filters.with_genres.length !== prevProps.filters.with_genres.length
		) {
			if (this.props.page !== 1) {
				this.props.onChangeParam('page', 1)
			}
			this.getMovies({
				filters: this.props.filters,
				page: 1
			})
			return
		}

		if (this.props.page !== prevProps.page) {
			this.getMovies({
				page: this.props.page
			})
		}
	}

	render() {
		const { movies } = this.state
		return (
			<div className="row">
				{movies.map(movie => {
					return (
						<div key={movie.id} className="col-6 mb-4">
							<MovieItem item={movie} />
						</div>
					)
				})}
			</div>
		)
	}
}
