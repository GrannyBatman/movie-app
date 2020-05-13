import React, { createContext } from 'react'
import Header from './Header/Header'
import Cookies from 'universal-cookie'
import CallApi from '../api/api'
import MoviesPage from './pages/MoviesPage/MoviesPage'
import MoviePage from './pages/MoviePage/MoviePage'
import { BrowserRouter, Route } from 'react-router-dom'

const cookies = new Cookies()
export const AppContext = createContext()

export default class App extends React.Component {
	state = {
		user: null,
		session_id: null
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
		const { user, session_id } = this.state
		return (
			<BrowserRouter>
				<AppContext.Provider
					value={{
						user,
						session_id,
						onChangeParam: this.onChangeParam,
						updateCookie: this.updateCookie
					}}
				>
					<Header user={user} onLogOut={this.onLogOut} />
					<Route exact path="/" component={MoviesPage} />
					<Route path="/movie/:id/:section" component={MoviePage} />
				</AppContext.Provider>
			</BrowserRouter>
		)
	}
}
