import React from 'react'
import CallApi from '../../api/api'

export default Component =>
	class GenresHOC extends React.Component {
		state = {
			genres: []
		}

		async componentDidMount() {
			try {
				const genresList = await (
					await CallApi.get('/genre/movie/list', {
						params: {
							language: 'ru-RU'
						}
					})
				).json()

				if (genresList.status_code) {
					throw new Error(genresList.status_message)
				}

				this.setState({
					genres: genresList.genres
				})
			} catch (error) {
				console.log(error)
			}
		}

		onChangeGenres = event => {
			this.props.onChangeFilters({
				target: {
					name: 'with_genres',
					value: event.target.checked
						? [...this.props.with_genres, event.target.name]
						: this.props.with_genres.filter(genre => genre !== event.target.name)
				}
			})
		}

		render() {
			const { onChangeFilters, ...componentProps } = this.props
			return (
				<Component
					genres={this.state.genres}
					onChange={this.onChangeGenres}
					{...componentProps}
				/>
			)
		}
	}
