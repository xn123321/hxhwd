import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Map from './pages/Map'
import Profile from './pages/Profile'
import NoMent from './pages/NoMent'
import City from './pages/City'
import 'antd-mobile/dist/antd-mobile.css'
import './index.scss'

class App extends React.Component {
  render () {
    return (
      
        <Router>
          <Switch>
            <Redirect exact from='/' to='/home'></Redirect>
            <Route path='/home' component = {Home}></Route>
            <Route path='/map' component = {Map}></Route>
            <Route path='/profile' component = {Profile}></Route>
            <Route path='/city' component = {City}></Route>
            <Route component = {NoMent}></Route>
          </Switch>
        </Router>
     
    )
  }
}

export default App