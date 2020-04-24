import React, { Component } from 'react'
import CallApi from '../../../api/api'
import Field from '../../UIComponents/Field'
import AppContextHOC from './../../HOC/AppContextHOC'

class LoginForm extends Component {
	state = {
		fields: {
			username: '',
			password: '',
			repeatPassword: ''
		},
		errors: {},
		submitting: false
	}

	onChange = ({ target: { name, value } }) => {
		this.setState(prevState => ({
			...prevState,
			fields: {
				...prevState.fields,
				[name]: value
			},
			errors: {
				...prevState.errors,
				[name]: null,
				base: null
			}
		}))
	}

	handleBlur = ({ target: { name, value } }) => {
		const validation = this.valideField(name, value)
		if (validation) {
			this.setState(prevState => ({
				errors: {
					...prevState.errors,
					[name]: validation
				}
			}))
		}
	}

	valideField = (name, value) => {
		switch (name) {
			case 'username':
				if (value === '') {
					return 'Not empty!'
				}
				break
			case 'password':
				if (value.length < 6) {
					return 'Must be 6 characters'
				}
				break
			case 'repeatPassword':
				if (value !== this.state.fields.password) {
					return 'Must be equal password'
				}
				break
			default:
				return false
		}
	}

	validateFields = () => {
		const errors = {}

		Object.keys(this.state.fields).forEach(item => {
			const validation = this.valideField(item, this.state.fields[item])
			if (validation) {
				errors[item] = validation
			}
		})

		return errors
	}

	async onSubmit() {
		this.setState({
			submitting: true
		})

		// get authentication token
		try {
			const auth = await (await CallApi.get('/authentication/token/new')).json()
			if (auth.status_code) {
				throw new Error(auth.status_message)
			}

			// login user
			try {
				const authLogin = await (
					await CallApi.post('/authentication/token/validate_with_login', {
						body: {
							username: this.state.fields.username,
							password: this.state.fields.password,
							request_token: auth.request_token
						}
					})
				).json()
				if (authLogin.status_code) {
					throw new Error(authLogin.status_message)
				}

				// get session token
				try {
					const authSession = await (
						await CallApi.post('/authentication/session/new', {
							body: {
								request_token: auth.request_token
							}
						})
					).json()
					if (authSession.status_code) {
						throw new Error(authSession.status_message)
					}

					this.props.onChangeParam('session_id', authSession.session_id)
					this.props.updateCookie('session_id', authSession.session_id)

					// account details
					try {
						const accountDetails = await (
							await CallApi.get('/account', {
								params: {
									session_id: authSession.session_id
								}
							})
						).json()

						this.setState(
							{
								submitting: false,
								errors: {
									base: null
								}
							},
							() => {
								this.props.onChangeParam('user', accountDetails)
							}
						)
					} catch (error) {
						// account details
						console.log(`account details: ${error.message}`)
					}
				} catch (error) {
					//session
					console.log(`session: ${error.message}`)
				}
			} catch (error) {
				// login
				this.setState({
					submitting: false,
					errors: {
						base: error.message
					}
				})
			}
		} catch (error) {
			// authentication
			console.log(`authentication: ${error.message}`)
		}
	}

	onLogin = e => {
		e.preventDefault()
		const errors = this.validateFields()
		if (Object.keys(errors).length > 0) {
			this.setState(prevState => ({
				errors: {
					...prevState.errors,
					...errors
				}
			}))
		} else {
			this.onSubmit()
		}
	}

	render() {
		const {
			fields: { username, password, repeatPassword },
			errors,
			submitting
		} = this.state
		return (
			<div className="form-login-container">
				<form className="form-login">
					<h1 className="h3 mb-3 font-weight-normal text-center">Авторизация</h1>
					<Field
						type="text"
						id="username"
						labelText="Пользователь"
						placeholder="Пользователь"
						name="username"
						value={username}
						error={errors.username}
						onChange={this.onChange}
						onBlur={this.handleBlur}
					/>
					<Field
						type="password"
						id="password"
						labelText="Пароль"
						placeholder="Пароль"
						name="password"
						value={password}
						error={errors.password}
						onChange={this.onChange}
						onBlur={this.handleBlur}
					/>
					<Field
						type="password"
						id="repeatPassword"
						labelText="Повторите пароль"
						placeholder="Повторите пароль"
						name="repeatPassword"
						value={repeatPassword}
						error={errors.repeatPassword}
						onChange={this.onChange}
						onBlur={this.handleBlur}
					/>
					<button
						type="submit"
						className="btn btn-lg btn-primary btn-block"
						onClick={this.onLogin}
						disabled={submitting}
					>
						Вход
					</button>
					{errors.base && (
						<div className="invalid-feedback text-center">{errors.base}</div>
					)}
				</form>
			</div>
		)
	}
}

export default AppContextHOC(LoginForm)
