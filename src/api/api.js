export const API_URL = 'https://api.themoviedb.org/3'

export const API_KEY_3 = '8165387a4a0245a7913eeea277d8ed32'

export const API_KEY_4 =
	'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTY1Mzg3YTRhMDI0NWE3OTEzZWVlYTI3N2Q4ZWQzMiIsInN1YiI6IjVlODkxNmJhNmM3NGI5MDAxNzk2MmE2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3ffXnyxMFdXfUbEX01xx6NQrF8OXbh331lLFy8oU4IY'

export const createFetchBodyPost = data => ({
	method: 'POST',
	mode: 'cors',
	headers: {
		'Content-type': 'application/json'
	},
	body: JSON.stringify(data)
})
