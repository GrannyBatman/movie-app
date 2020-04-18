import React from 'react'

const MovieItem = ({ backdrop_path, poster_path, title, vote_average }) => (
	<div className="card">
		<div className="card-img-wrap">
			<img
				className="card-img-top card-img--height"
				src={`https://image.tmdb.org/t/p/w500${backdrop_path || poster_path}`}
				alt=""
			/>
		</div>
		<div className="card-body">
			<h6 className="card-title">{title}</h6>
			<div className="card-text">Рейтинг: {vote_average}</div>
		</div>
	</div>
)

export default MovieItem
