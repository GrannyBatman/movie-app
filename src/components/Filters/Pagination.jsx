import React from 'react'

const Pagination = ({ page, onChangeParam, total_pages }) => (
	<div className="d-flex justify-content-between align-items-center">
		<div className="btn-group">
			<button
				type="button"
				className="btn btn-light"
				disabled={page === 1}
				onClick={onChangeParam.bind(null, 'page', page - 1)}
			>
				Назад
			</button>
			<button
				type="button"
				className="btn btn-light"
				disabled={page === total_pages}
				onClick={onChangeParam.bind(null, 'page', page + 1)}
			>
				Вперед
			</button>
		</div>
		<div>
			Страница: {page} из {total_pages}
		</div>
	</div>
)

export default Pagination
