import React from 'react'
import { NavBar } from 'antd-mobile'
import axios from 'axios'

class City extends React.Component {
  city(lists) {
    const obj = {}
    lists.forEach(item => {
      const key = item.short.slice(0, 1)
      if (key in obj) {
        obj[key].push(item)
      } else {
        obj[key] = [item]
      }


    })
    console.log(obj)
    const list = Object.keys(obj).sort()
    return {
      obj,
      list
    }
  }

  async getcity() {
    const res = await axios.get('http://localhost:8080/area/city?level=1')
    const { obj, list } = this.city(res.data.body)
  }

  componentDidMount() {
    this.getcity()
    navigator.geolocation.getCurrentPosition(function(position) {
      do_something(position.coords.latitude, position.coords.longitude);
    }) 
  }

  render() {
    return (
      <div className="city">
        <NavBar mode="dark" icon={<i className="iconfont icon-back" />}>
          城市选择
        </NavBar>
    
      </div>
    )
  }
}

export default City
