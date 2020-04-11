import React, { Component } from 'react'
import { API_URL, API_KEY_3 } from '../../api/api'

export default class Genres extends Component {
	state = {
		genres: []
	}

	async getGenres() {
		try {
			const response = await fetch(
				`${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`
			)
			const data = await response.json()

			if (response.status === 200) {
				this.setState({
					genres: data.genres
				})
			}
		} catch (error) {
			console.log(error)
		}
	}

	componentDidMount() {
		this.getGenres()
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
		return (
			<div className="form-group">
				{this.state.genres &&
					this.state.genres.map(item => (
						<div className="form-check" key={`genre-${item.id}`}>
							<input
								className="form-check-input"
								type="checkbox"
								id={`genre-${item.id}`}
								name={item.id}
								onChange={this.onChangeGenres}
								checked={this.props.with_genres.includes(item.id + '')}
							/>
							<label className="form-check-label" htmlFor={`genre-${item.id}`}>
								{item.name}
							</label>
						</div>
					))}
			</div>
		)
	}
}
