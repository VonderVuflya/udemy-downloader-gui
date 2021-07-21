import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Card, Row, Col, Button, Progress } from 'antd'
import {
  CloudDownloadOutlined,
  PauseOutlined,
  CaretRightOutlined,
} from '@ant-design/icons'

import {
  pauseDownload,
  resumeDownload,
  deleteDownload,
} from '../ducks/downloads'

const stylesSpa = {
  display: 'inline-block',
  fontSize: '17px',
  position: 'absolute',
  top: '-7px',
  right: '0px',
  cursor: 'pointer',
}

function Course({ key, id, image, title, downloadInfo, onDownload }) {
  const [isLoading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const isPauseDisabled = () => {
    if (downloadInfo) {
      if (downloadInfo.status === 'downloading') {
        return false
      }
      return true
    }

    return true

    // if (downloadInfo) {
    //   if(downloadInfo.status === "waiting"){
    //     return true
    //   }

    //   if (downloadInfo.downloadInstance) {
    //     if (
    //       downloadInfo.status === "waiting" ||
    //       downloadInfo.status === "paused"
    //     ) {
    //       return true
    //     }
    //   } else {
    //     return true
    //   }
    // } else {
    //   return true
    // }
  }

  const isResumeDisabled = () => {
    if (downloadInfo) {
      const { status } = downloadInfo
      if (status !== 'waiting' && isPauseDisabled()) {
        return false
      }

      return true
    }

    return true

    // if (downloadInfo) {
    //   if (downloadInfo.status === 'waiting') {
    //     return true
    //   }

    //   if (downloadInfo.downloadInstance) {
    //     if (
    //       downloadInfo.status === 'waiting' ||
    //       downloadInfo.status === 'downloading'
    //     ) {
    //       return true
    //     }
    //     if (downloadInfo.status === 'paused') {
    //       return false
    //     }
    //   } else {
    //     return downloadInfo.status === 'waiting'
    //   }
    // } else {
    //   return true
    // }
  }

  return (
    <Card size='small' loading={isLoading}>
      <Row>
        <Col span={9}>
          <img src={image} alt={title} />
        </Col>
        <Col span={15} style={{ position: 'relative' }}>
          <Row className='mb-3'>{title}</Row>
          {downloadInfo ? (
            <span
              style={stylesSpa}
              aria-hidden='true'
              onClick={() => dispatch(deleteDownload(id))}
            >
              &times;
            </span>
          ) : null}
          <Row gutter={8} align='middle' className='mb-2'>
            <Col>
              <Button
                onClick={() =>
                  onDownload(
                    { key, id, image, title, downloadInfo, onDownload },
                    setLoading
                  )
                }
                shape='circle'
                className={classNames('flex justify-center border-2', {
                  'opacity-50': downloadInfo,
                })}
                icon={
                  <CloudDownloadOutlined className='bg-indigo-500 text-white rounded-full leading-zero p-1' />
                }
                disabled={downloadInfo}
              />
            </Col>
            <Col>
              <Button
                onClick={() => dispatch(pauseDownload(id))}
                shape='circle'
                className={classNames('flex justify-center border-2', {
                  'opacity-50': isPauseDisabled(),
                })}
                icon={
                  <PauseOutlined className=' bg-orange-500 text-white rounded-full leading-zero p-1' />
                }
                disabled={isPauseDisabled()}
              />
            </Col>
            <Col>
              <Button
                onClick={() => dispatch(resumeDownload(id))}
                shape='circle'
                className={classNames('flex justify-center border-2', {
                  'opacity-50': isResumeDisabled(),
                })}
                icon={
                  <CaretRightOutlined className=' bg-green-500 text-white rounded-full leading-zero p-1' />
                }
                disabled={isResumeDisabled()}
              />
            </Col>

            {downloadInfo ? (
              <Col offset={8}>
                <Progress
                  type='circle'
                  percent={(downloadInfo.downloaded / downloadInfo.total) * 100}
                  width={35}
                  showInfo={false}
                  strokeWidth={15}
                />
              </Col>
            ) : null}
          </Row>

          {downloadInfo ? (
            <Row className='mt-5'>
              <Progress
                percent={downloadInfo.currentProgress}
                size='small'
                showInfo={false}
              />
            </Row>
          ) : null}
        </Col>
      </Row>
    </Card>
  )
}

Course.propTypes = {
  key: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  downloadInfo: PropTypes.shape.isRequired,
  onDownload: PropTypes.func.isRequired,
}

export default Course
