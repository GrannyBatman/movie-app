import queryString from 'query-string'

export const API_URL = 'https://api.themoviedb.org/3'

export const API_KEY_3 = '8165387a4a0245a7913eeea277d8ed32'

export const API_KEY_4 =
	'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTY1Mzg3YTRhMDI0NWE3OTEzZWVlYTI3N2Q4ZWQzMiIsInN1YiI6IjVlODkxNmJhNmM3NGI5MDAxNzk2MmE2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3ffXnyxMFdXfUbEX01xx6NQrF8OXbh331lLFy8oU4IY'

export default class CallApi {
	static createLink = (url, options = {}) => {
		const { params = {} } = options
		const queryStringParams = {
			api_key: API_KEY_3,
			...params
		}
		return `${API_URL}${url}?${queryString.stringify(queryStringParams)}`
	}

	static get(url, options) {
		const link = this.createLink(url, options)

		return fetch(link, {
			mode: 'cors',
			headers: {
				'Content-type': 'application/json'
			}
		})
	}

	static post(url, options = {}) {
		const { body } = options,
			link = this.createLink(url, options)

		return fetch(link, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(body)
		})
	}

	static delete(url, options = {}) {
		const { body } = options,
			link = this.createLink(url, options)

		return fetch(link, {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(body)
		})
	}
}
