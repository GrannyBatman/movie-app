import React, { Component } from 'react'
import { Star, StarBorder, Bookmark, BookmarkBorder } from '@material-ui/icons'
import CallApi from '../../api/api'
import AppContextHOC from '../HOC/AppContextHOC'

class MovieItem extends Component {
	state = {
		favorite: false,
		watchlist: false
	}

	toggleList = async (param, listName) => {
		await (
			await CallApi.post(`/account/${this.props.user.id}/${param}`, {
				params: {
					session_id: this.props.session_id
				},
				body: {
					media_type: 'movie',
					media_id: this.props.id,
					[param]: !this.state[param]
				}
			})
		).json()

		if (this.state[param]) {
			this.props.onChangeParam(
				listName,
				this.props[listName].filter(item => item.id !== this.props.id)
			)
		} else {
			const {
				favoriteMovies,
				onChangeParam,
				session_id,
				updateCookie,
				user,
				watchlistMovies,
				...movie
			} = this.props

			const newList = [...this.props[listName]]
			newList.push({ ...movie })
			this.props.onChangeParam(listName, newList)
		}

		this.setState(prevState => ({
			[param]: !prevState[param]
		}))
	}

	// TODO: fix favorite/watchlist
	componentDidUpdate(prevProps, prevState) {
		// console.log('prevProps: ', prevProps)
		if (prevProps.favoriteMovies.length !== this.props.favoriteMovies.length) {
			console.log(123)
		}
	}

	componentDidMount() {
		// console.log(this.props)
		if (this.props.favoriteMovies.some(item => item.id === this.props.id)) {
			this.setState({
				favorite: true
			})
		}
		if (this.props.watchlistMovies.some(item => item.id === this.props.id)) {
			this.setState({
				watchlist: true
			})
		}
	}

	render() {
		const { backdrop_path, poster_path, title, vote_average } = this.props
		return (
			<div className="card">
				<div className="card-img-wrap">
					<img
						className="card-img-top card-img--height"
						src={`https://image.tmdb.org/t/p/w500${backdrop_path || poster_path}`}
						alt=""
					/>
				</div>
				<div className="card-body">
					<div className="row">
						<div className="col-8">
							<h6 className="card-title">{title}</h6>
							<div className="card-text">Рейтинг: {vote_average}</div>
						</div>
						{this.props.session_id && (
							<div className="col-4">
								<span onClick={() => this.toggleList('favorite', 'favoriteMovies')}>
									{this.state.favorite ? (
										<Star className="icon-movie" />
									) : (
										<StarBorder className="icon-movie" />
									)}
								</span>
								<span
									onClick={() => this.toggleList('watchlist', 'watchlistMovies')}
									className="ml-2"
								>
									{this.state.watchlist ? (
										<Bookmark className="icon-movie" />
									) : (
										<BookmarkBorder className="icon-movie" />
									)}
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
		)
	}
}

export default AppContextHOC(MovieItem)
