import React from 'react'
import PropTypes from 'prop-types'
import GenresHOC from './GenresHOC'

const Genres = ({ genres, onChange, with_genres }) => {
	return (
		<div className="form-group">
			{genres &&
				genres.map(item => (
					<div className="form-check" key={`genre-${item.id}`}>
						<input
							className="form-check-input"
							type="checkbox"
							id={`genre-${item.id}`}
							name={item.id}
							onChange={onChange}
							checked={with_genres.includes(item.id + '')}
						/>
						<label className="form-check-label" htmlFor={`genre-${item.id}`}>
							{item.name}
						</label>
					</div>
				))}
		</div>
	)
}

Genres.defaultProps = {
	genres: []
}

Genres.propTypes = {
	genres: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	with_genres: PropTypes.array.isRequired
}

export default GenresHOC(Genres)
