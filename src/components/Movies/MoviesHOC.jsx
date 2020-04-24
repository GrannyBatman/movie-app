import React from 'react'
import CallApi from '../../api/api'
import _ from 'lodash'

export default Component =>
	class MoviesHOC extends React.Component {
		state = {
			movies: []
		}

		async getMovies({
			filters: { sort_by, primary_release_year, with_genres } = this.props.filters,
			page = this.props.page
		}) {
			try {
				if (with_genres.length > 1) {
					with_genres = with_genres.join('|') // | - знак ИЛИ (пример: драма или боевик или вестерн)
				}

				const queryStringParams = {
					language: 'ru-RU',
					sort_by,
					page,
					primary_release_year,
					with_genres
				}

				const data = await (
					await CallApi.get('/discover/movie', {
						params: queryStringParams
					})
				).json()

				if (this.props.total_pages !== data.total_pages) {
					this.props.onChangeParam('total_pages', data.total_pages)
				}

				if (data.status_message) {
					throw new Error(data.status_message)
				}

				this.setState({
					movies: data.results
				})
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
			return <Component movies={this.state.movies} />
		}
	}
