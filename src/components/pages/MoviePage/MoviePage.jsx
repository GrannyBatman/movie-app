import React, { Component } from 'react'
import CallApi from '../../../api/api'
import { TabContent, TabPane, Nav, NavItem, Row, Col } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import MovieSimilar from './MovieSimilar'

// const details = [
// 	{
// 		label: 'Статус',
// 		key: 'status'
// 	},
// 	{
// 		label: 'Дата выхода',
// 		key: 'release_date'
// 	},
// 	{
// 		label: 'Продолжительность',
// 		key: 'runtime'
// 	},
// 	{
// 		label: 'Язык оригинала',
// 		key: 'original_language'
// 	},
// 	{
// 		label: 'Страна',
// 		key: 'production_countries',
// 		badges: true
// 	},
// 	{
// 		label: 'Бюджет',
// 		key: 'budget'
// 	},
// 	{
// 		label: 'Сборы',
// 		key: 'revenue'
// 	},
// 	{
// 		label: 'Компания',
// 		key: 'production_companies',
// 		badges: true
// 	},
// 	{
// 		label: 'Жанры',
// 		key: 'genres',
// 		badges: true
// 	}
// ]

export default class MoviePage extends Component {
	state = {
		movie: {},
		similar: [],
		activeTab: '1'
	}

	toggleTab = tab => {
		this.setState(prevState => {
			if (tab !== prevState.activeTab) {
				return {
					activeTab: tab
				}
			}
		})
	}

	async componentDidMount() {
		// console.log(this.props.match.params)
		const movie = await (
			await CallApi.get(`/movie/${this.props.match.params.id}`, {
				params: {
					language: 'ru-RU'
				}
			})
		).json()
		const credits = await (
			await CallApi.get(`/movie/${this.props.match.params.id}/credits`)
		).json()
		// console.log(similar.results)
		this.checkMountTabs()

		this.setState({
			movie,
			credits
		})
	}

	checkMountTabs = () => {
		let tab = '1'
		if (this.props.match.params.section === 'similar') {
			tab = '2'
		} else if (this.props.match.params.section === 'actors') {
			tab = '3'
		}
		this.toggleTab(tab)
	}

	createBadges = items =>
		items.map((item, index) => (
			<div key={`${item.name}-${index}`}>
				<span className="badge badge-primary">{item.name}</span>
			</div>
		))

	render() {
		const {
			backdrop_path,
			poster_path,
			title,
			overview,
			status,
			release_date,
			runtime,
			original_language,
			budget,
			revenue,
			production_countries,
			production_companies,
			genres
		} = this.state.movie
		return (
			<div className="container">
				{Object.keys(this.state.movie).length > 0 && (
					<>
						<div className="row mt-4">
							<div className="col-4">
								<img
									className="card-img-top"
									src={`https://image.tmdb.org/t/p/w500${
										backdrop_path || poster_path
									}`}
									alt=""
								/>
							</div>
							<div className="col-8">
								<h3 className="card-title">{title}</h3>
								<p className="card-text">{overview}</p>
							</div>
						</div>
						<div className="row mt-4">
							<div className="col-12">
								<Nav tabs>
									<NavItem>
										<NavLink
											className="nav-link"
											onClick={() => {
												this.toggleTab('1')
											}}
											to={`/movie/${this.props.match.params.id}/details`}
										>
											Детали
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink
											className="nav-link"
											onClick={() => {
												this.toggleTab('2')
											}}
											to={`/movie/${this.props.match.params.id}/similar`}
										>
											Похожие фильмы
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink
											className="nav-link"
											onClick={() => {
												this.toggleTab('3')
											}}
											to={`/movie/${this.props.match.params.id}/actors`}
										>
											Актеры
										</NavLink>
									</NavItem>
								</Nav>
								<TabContent activeTab={this.state.activeTab} className="mt-3">
									<TabPane tabId="1">
										<Row>
											<Col sm="12">
												<table className="table">
													<tbody>
														<tr>
															<th>Статус</th>
															<td>{status}</td>
														</tr>
														<tr>
															<th>Дата выхода</th>
															<td>{release_date}</td>
														</tr>
														<tr>
															<th>Продолжительность</th>
															<td>{runtime} минут</td>
														</tr>
														<tr>
															<th>Язык оригинала</th>
															<td>{original_language}</td>
														</tr>
														<tr>
															<th>Страна</th>
															<td>
																{this.createBadges(
																	production_countries
																)}
															</td>
														</tr>
														<tr>
															<th>Бюджет</th>
															<td>{budget}$</td>
														</tr>
														<tr>
															<th>Сборы</th>
															<td>{revenue}$</td>
														</tr>
														<tr>
															<th>Компания</th>
															<td>
																{this.createBadges(
																	production_companies
																)}
															</td>
														</tr>
														<tr>
															<th>Жанры</th>
															<td>{this.createBadges(genres)}</td>
														</tr>
													</tbody>
												</table>
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="2">
										<Row>
											<Col sm="12">
												<MovieSimilar id={this.props.match.params.id} />
											</Col>
										</Row>
									</TabPane>
									<TabPane tabId="3">
										<Row>
											<Col sm="12">
												<h4>Tab 3 Contents</h4>
											</Col>
										</Row>
									</TabPane>
								</TabContent>
							</div>
						</div>
					</>
				)}
			</div>
		)
	}
}
