import React from 'react'
import './index.scss'
class News extends React.Component {
  componentDidMount () {
    var map = new window.BMap.Map("container");
    var point = new window.BMap.Point(121.61893324731646, 31.04054438062165); 
    map.centerAndZoom(point, 18); 
    var marker = new window.BMap.Marker(point);        // 创建标注    
    map.addOverlay(marker);    
  }    
  render () {
    return (
      <div className='map'>
        <div id="container"></div>         
      </div>
    )
  }
}

export default News