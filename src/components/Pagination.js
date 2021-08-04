import React from 'react'
import PropTypes from 'prop-types'
import { Row, Pagination as AntPagination } from 'antd'

function Pagination({ totalCourses, pageSize, pageNumber, onChange }) {
  return (
    <Row justify='center' className='p-3 bg-gray-100'>
      <AntPagination
        total={totalCourses}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        pageSize={pageSize}
        defaultCurrent={1}
        current={pageNumber}
        showLessItems
        onChange={onChange}
      />
    </Row>
  )
}

Pagination.propTypes = {
  totalCourses: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Pagination
