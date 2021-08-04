import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

import 'antd/dist/antd.css'
import './App.css'

function App() {
  const accessToken = useSelector(state => state.user.accessToken)

  useEffect(() => {
    if (accessToken) {
      axios.interceptors.request.use(config => {
        const updatedHeaders = config
        updatedHeaders.headers = {
          ...config.header,
          Authorization: `Bearer ${accessToken}`,
        }
        return updatedHeaders
      })
    }
  }, [accessToken])

  return (
    <div className='App'>
      <Switch>
        <Route path={['/', '/dashboard/courses']} component={Dashboard} exact />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/login' component={Login} />
      </Switch>
    </div>
  )
}

export default App
