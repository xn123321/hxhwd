import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Map from './pages/Map'
import Profile from './pages/Profile'
import NoMent from './pages/NoMent'

import 'antd-mobile/dist/antd-mobile.css'
import './index.scss'

class App extends React.Component {
  render () {
    return (
      <div>
        <Router>
          <Switch>
            <Redirect exact from='/' to='/home'></Redirect>
            <Route path='/home' component = {Home}></Route>
            <Route path='/map' component = {Map}></Route>
            <Route path='/profile' component = {Profile}></Route>
            <Route component = {NoMent}></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App