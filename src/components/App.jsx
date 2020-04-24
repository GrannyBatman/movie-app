import React, { createContext } from 'react'
import Filters from './Filters/Filters'
import MoviesList from './Movies/MoviesList'
import ResetFilters from './ResetFilters'
import Header from './Header/Header'
import Cookies from 'universal-cookie'
import CallApi from '../api/api'

const cookies = new Cookies()
export const AppContext = createContext()

export default class App extends React.Component {
	state = {
		user: null,
		session_id: null,
		filters: {
			sort_by: 'popularity.desc',
			primary_release_year: '',
			with_genres: []
		},
		page: 1,
		total_pages: ''
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

	updateCookie = (key, value) => {
		cookies.set(key, value, {
			path: '/',
			maxAge: 2592000 // 30 days
		})
	}

	removeCookie = key => {
		cookies.remove(key, {
			path: '/'
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

	onLogOut = () => {
		this.setState({
			user: null,
			session_id: null
		})
		this.removeCookie('session_id')
	}

	async componentDidMount() {
		const session_id = cookies.get('session_id')
		if (session_id) {
			try {
				const accountDetails = await (
					await CallApi.get('/account', {
						params: {
							session_id
						}
					})
				).json()

				this.setState({
					user: accountDetails,
					session_id
				})
			} catch (error) {
				console.log(`accountDetails: ${error.message}`)
			}
		}
	}

	render() {
		const { filters, page, total_pages, user, session_id } = this.state
		return (
			<AppContext.Provider
				value={{
					user,
					session_id,
					onChangeParam: this.onChangeParam,
					updateCookie: this.updateCookie
				}}
			>
				<Header user={user} onLogOut={this.onLogOut} />
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
			</AppContext.Provider>
		)
	}
}
