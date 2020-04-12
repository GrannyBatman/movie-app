import React, { Component } from 'react'
import MovieItem from './MovieItem'
import { API_URL, API_KEY_3 } from '../../api/api'
import queryString from 'query-string'
import _ from 'lodash'

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
			if (with_genres.length > 1) {
				with_genres = with_genres.join('|') // | - знак ИЛИ (пример: драма или боевик или вестерн)
			}
			let queryStringParams = {
				api_key: API_KEY_3,
				sort_by,
				page,
				primary_release_year,
				with_genres
			}

			const response = await fetch(
				`${API_URL}/discover/movie?${queryString.stringify(queryStringParams)}`
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
		if (!_.isEqual(this.props.filters, prevProps.filters)) {
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
							<MovieItem {...movie} />
						</div>
					)
				})}
			</div>
		)
	}
}
