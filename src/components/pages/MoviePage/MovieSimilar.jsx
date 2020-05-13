import React, { Component } from 'react'
import CallApi from '../../../api/api'
import Pagination from '../../Filters/Pagination'

export default class MovieSimilar extends Component {
	state = {
		results: []
	}

	async componentDidMount() {
		const similar = await (
			await CallApi.get(`/movie/${this.props.id}/similar`, {
				params: {
					language: 'ru-RU'
				}
			})
		).json()
		this.setState({
			...similar
		})
	}

	getMovies = async () => {
		const similar = await (
			await CallApi.get(`/movie/${this.props.id}/similar`, {
				params: {
					language: 'ru-RU',
					page: this.state.page
				}
			})
		).json()
		this.setState({
			results: similar.results
		})
	}

	onChangeParam = (key, value) => {
		this.setState({
			[key]: value
		})
	}

	render() {
		return (
			<div>
				<Pagination
					page={this.state.page}
					total_pages={this.state.total_pages}
					onChangeParam={this.onChangeParam}
				/>
			</div>
		)
	}
}
