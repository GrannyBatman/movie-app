import React from 'react'

const ResetFilters = ({ onResetFilters }) => (
	<div className="text-right">
		<button type="button" className="btn btn-primary" onClick={onResetFilters}>
			Сбросить фильтры
		</button>
	</div>
)

export default ResetFilters
