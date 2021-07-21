import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { Layout, Modal, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import Courses from './Courses'
import Downloads from './Downloads'
import Settings from './Settings'

import { logout } from '../ducks/user'
import Navigation from '../components/Navigation'

const { Content } = Layout

function Dashboard() {
  const accessToken = useSelector(state => state.user.accessToken)
  const isLoading = useSelector(state => state.dashboard.isLoading)

  const [modal, contextHolder] = Modal.useModal()

  const dispatch = useDispatch()

  const handleLogout = () => {
    modal.confirm({
      title: 'Confirm Logout',
      content: 'Are you sure ?',
      okText: 'Yes',
      onOk: () => {
        dispatch(logout())
      },
    })
  }

  return accessToken ? (
    <Layout>
      {isLoading ? (
        <Spin
          indicator={<LoadingOutlined />}
          size='large'
          className='fixed w-full h-full z-50 flex items-center justify-center bg-white bg-opacity-50'
        />
      ) : null}

      {contextHolder}

      <Navigation handleLogout={handleLogout} />

      <Content className='bg-white'>
        <Route path='/dashboard/courses'>
          {/* <Settings /> */}
          <Courses isLoading={isLoading} />
        </Route>

        <Route path='/dashboard/downloads'>
          <Downloads />
        </Route>

        <Route path='/dashboard/settings'>
          <Settings />
        </Route>
      </Content>
    </Layout>
  ) : (
    <Redirect to='/login' />
  )
}

export default Dashboard
