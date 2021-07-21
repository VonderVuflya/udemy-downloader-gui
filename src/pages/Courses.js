/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Row, Input, Result, Modal, Form, Tree } from 'antd'
import { remote } from 'electron'
import fs from 'fs'

import Course from '../components/Course'
import Pagination from '../components/Pagination'
import DownloadSettings from '../components/Settings'

import { loadCourses, searchCourses } from '../ducks/courses'
import { downloadCourse } from '../ducks/downloads'

const { dialog } = remote

const Courses = ({ isLoading }) => {
  const courses = useSelector(state => state.courses.data)
  const totalCourses = useSelector(state => state.courses.total)
  const pageNumber = useSelector(state => state.courses.pageNumber)
  const search = useSelector(state => state.courses.search)
  const downloads = useSelector(state => state.downloads)
  const settings = useSelector(state => state.settings)

  const [courseStateData, setCourseStateData] = useState({})
  const [modal, setModal] = useState(false)
  const [curriculumModal, setCurriculumModal] = useState(false)
  const [curriculum, setCurriculum] = useState([])
  const [treeData, setTreeData] = useState([])

  const [checkedKeys, setCheckedKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])

  const [form] = Form.useForm()

  const dispatch = useDispatch()

  const { enabledSettings } = settings
  const allSettings = ['download', 'lecture', 'attachment', 'subtitle']
  const missing = allSettings.filter(s => !enabledSettings.includes(s))

  useEffect(() => {
    if (!courses.length) {
      dispatch(loadCourses())
    }
  }, [dispatch, courses.length])

  useEffect(() => {
    if (
      Object.keys(courseStateData).length &&
      downloads[courseStateData.course.id]
    ) {
      setCurriculum(downloads[courseStateData.course.id].curriculum)
    } else {
      setCurriculum([])
    }
  }, [courseStateData, downloads])

  useEffect(() => {
    if (!curriculum.length) return
    const arr = []
    let obj = {}
    let key = -1
    console.log(curriculum)

    curriculum.forEach(c => {
      // eslint-disable-next-line no-underscore-dangle
      if (c._class === 'chapter') {
        key += 1
        obj = {
          title: c.title,
          key: c.id,
          children: [],
        }
        arr[key] = { ...obj }
      } else {
        obj = { title: c.title, key: c.asset.id }
        arr[key].children.push(obj)
      }
    })
    console.log(arr)
    setTreeData(arr)
    setCurriculumModal(true)
  }, [curriculum])

  const selectDownloadPath = () => {
    const path = dialog.showOpenDialogSync({
      properties: ['openDirectory'],
    })

    if (path && path[0]) {
      fs.access(path[0], fs.R_OK && fs.W_OK, err => {
        if (err) {
          console.log(err)
        } else {
          form.setFieldsValue({ downloadPath: path[0] })
        }
      })
    }
  }

  const updateCheckedFields = (field, checked) => {
    const enabledSettingsField = form.getFieldValue('enabledSettings')
    const index = enabledSettingsField.indexOf(field)

    if (checked) {
      if (index === -1) enabledSettingsField.push(field)
    } else if (index !== -1) enabledSettingsField.splice(index, 1)

    form.setFieldsValue({ enabledSettings })
  }

  const handleDownload = (course, setLoading) => {
    if (settings.enabledSettings.length < allSettings.length) {
      setCourseStateData({
        course: { ...course },
        setLoading,
      })
      setModal(true)
    } else {
      dispatch(downloadCourse(course, setLoading, settings))
    }
  }

  const handleSubmit = values => {
    setModal(false)
    dispatch(
      downloadCourse(courseStateData.course, courseStateData.setLoading, {
        ...settings,
        ...values,
      })
    )

    form.resetFields()
  }

  const onCheck = check => {
    console.log('onCheck', check)
    setCheckedKeys(check)
  }

  const onSelect = (currentKey, info) => {
    console.log('onSelect', info)
    setSelectedKeys(currentKey)
  }

  const Paginate = ({ pageSize }) => {
    return totalCourses > pageSize ? (
      <Pagination
        pageSize={pageSize}
        totalCourses={totalCourses}
        pageNumber={pageNumber}
        onChange={updatedPageNumber =>
          dispatch(
            search
              ? searchCourses(search, updatedPageNumber)
              : loadCourses(updatedPageNumber)
          )
        }
      />
    ) : null
  }

  Paginate.propTypes = {
    pageSize: PropTypes.number.isRequired,
  }

  return (
    <>
      <Row className='p-3'>
        <Input.Search
          placeholder='Search Courses'
          size='large'
          allowClear
          defaultValue={search}
          onSearch={value => dispatch(searchCourses(value))}
        />
      </Row>

      {courses.length && (
        <>
          <Paginate pageSize={20} />

          {courses.map(({ id, image_125_H, title }) => (
            <Course
              key={id}
              id={id}
              image={image_125_H}
              title={title}
              downloadInfo={downloads[id]}
              onDownload={handleDownload}
            />
          ))}

          <Paginate pageSize={20} />
        </>
      )}
      {!courses.length && !isLoading ? (
        <Row justify='center' className='p-3'>
          <Result
            status='404'
            title='No Courses Found'
            subTitle='We could not find any courses in your account'
          />
        </Row>
      ) : null}

      {modal && (
        <Modal
          title='Update Settings'
          visible
          onCancel={() => setModal(false)}
          footer={[]}
          destroyOnClose
        >
          <DownloadSettings
            initialValues={{ ...settings, enabledSettings: [...missing] }}
            onSelectDownloadPath={selectDownloadPath}
            onUpdateCheckedFields={updateCheckedFields}
            form={form}
            onSubmit={handleSubmit}
          />
        </Modal>
      )}

      {curriculumModal && (
        <Modal
          title='Download Specific'
          visible
          onCancel={() => setCurriculumModal(false)}
          footer={[]}
          destroyOnClose
        >
          <Tree
            checkable
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={treeData}
          />
        </Modal>
      )}
    </>
  )
}

Courses.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

export default Courses
