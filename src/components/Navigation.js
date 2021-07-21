import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Menu, Layout } from 'antd'
import {
  AppstoreOutlined,
  CloudDownloadOutlined,
  SettingOutlined,
  PoweroffOutlined,
} from '@ant-design/icons'

function Navigation({ handleLogout }) {
  return (
    <Layout.Sider collapsed>
      <Menu defaultSelectedKeys={['1']} className='h-full'>
        <Menu.Item
          key='1'
          title={null}
          icon={<AppstoreOutlined />}
          className='mt-0'
        >
          <Link to='/dashboard/courses' />
        </Menu.Item>
        <Menu.Item key='2' title={null} icon={<CloudDownloadOutlined />}>
          <Link to='/dashboard/downloads' />
        </Menu.Item>
        <Menu.Item key='3' title={null} icon={<SettingOutlined />}>
          <Link to='/dashboard/settings' />
        </Menu.Item>
        <Menu.Item
          key='4'
          title={null}
          icon={<PoweroffOutlined />}
          onClick={handleLogout}
        />
      </Menu>
    </Layout.Sider>
  )
}

Navigation.propTypes = {
  handleLogout: PropTypes.func.isRequired,
}

export default Navigation
