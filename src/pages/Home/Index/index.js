import React from 'react'
import { Flex, Carousel, WingBlank  } from 'antd-mobile'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Nav1 from '../../../assets/images/nav-1.png'
import Nav2 from '../../../assets/images/nav-2.png'
import Nav3 from '../../../assets/images/nav-3.png'
import Nav4 from '../../../assets/images/nav-4.png'
import './index.scss'
class Index extends React.Component {
  state = {
    swipers: [],
    imgHeight: 176,
    // 判断轮播图是否加载成功
    isLoaded: false,
    comtent: []
  }
  
  async getswipers () {
    const res = await axios.get('http://localhost:8080/home/swiper') 
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        swipers: body,
        isLoaded: true
      })
    }
  }
  componentDidMount() {
    // 发送ajax请求，获取轮播图的数据
    this.getswipers()
    this.getcomtent()
  }
  renderswipers () {
    if(!this.state. isLoaded) {
      return
    }
    return (
      <Carousel autoplay infinite>
          {this.state.swipers.map(item => (
            <a
              key={item.id}
              href="http://www.baidu.com"
              style={{
                display: 'inline-block',
                width: '100%',
                height: this.state.imgHeight
              }}
            >
              <img
                src={`http://localhost:8080${item.imgSrc}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'))
                  this.setState({ imgHeight: 'auto' })
                }}
              />
            </a>
          ))}
        </Carousel>
    )
  }
  async getcomtent () {
    const res = await axios.get('http://localhost:8080/home/groups?area=AREA%7C88cff55c-aaa4-e2e0')
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        comtent: body
      })
    } 
  }
  rendercomtent () {
    return (
      <div>
        {this.state.comtent.map(itema => (
      <div className="item" key={itema.id}>
        <div className="left">
          <p>{itema.title}</p>
          <p>{itema.desc}</p>
        </div>
        <div className="rigth">
        <img src={`http://localhost:8080${itema.imgSrc}`} alt=""/>
        </div>
      </div>
      ))}
      </div>
    )
  }

  render() {
    return (
      <div className="index">
        <div className="swipers">
          {this.renderswipers()}
        </div>
        <div className="nav">
        <Flex>
          <Flex.Item>
            <Link to="home/house">
              <img src={Nav1} alt=""/>
              <p>整租</p>
            </Link>
          </Flex.Item>
          <Flex.Item>
            <Link to="home/house">
              <img src={Nav2} alt=""/>
              <p>合租</p>
            </Link>
          </Flex.Item>
          <Flex.Item>
            <Link to="map">
              <img src={Nav3} alt=""/>
              <p>地图找房</p>
            </Link>
          </Flex.Item>
          <Flex.Item>
            <Link to="rent">
              <img src={Nav4} alt=""/>
              <p>去出租</p>
            </Link>
          </Flex.Item>
        </Flex>
        </div>
        <div className="main">
        <WingBlank>
          <div className="title">
            <div>租房小组</div>
            <Link to="">更多</Link>
          </div>
          <div className="comtnet">
            {/* <div className="item">
              <div className="left">
                <p>家住回龙观</p>
                <p>归属的感觉</p>
              </div>
              <div className="rigth">
              <img src={Nav1} alt=""/>
              </div>
            </div> */}
            {this.rendercomtent()}
          </div>
          </WingBlank>
        </div>
      </div>
    )
  }
}

export default Index
