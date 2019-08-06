import React from 'react'
import { Flex, Carousel, WingBlank } from 'antd-mobile'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Nav1 from 'assets/images/nav-1.png'
import Nav2 from 'assets/images/nav-2.png'
import Nav3 from 'assets/images/nav-3.png'
import Nav4 from 'assets/images/nav-4.png'
import './index.scss'
class Index extends React.Component {
  state = {
    swipers: [],
    imgHeight: 176,
    // 判断轮播图是否加载成功
    isLoaded: false,
    comtent: [],
    info: [],
    cityName: '北京'
  }

  async getswipers() {
    const res = await axios.get('http://localhost:8080/home/swiper')
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        swipers: body,
        isLoaded: true
      })
    }
  }
  // 表示组件已经挂载好，在这里通常用来发送axios，和一些DOM操作
  componentDidMount() {
    // 发送ajax请求，获取轮播图的数据
    this.getswipers()
    this.getcomtent()
    this.getinfo()

    let myCity = new window.BMap.LocalCity()
    myCity.get(async result => {
      // 百度地图通过地理位置获取到的城市的名字
      console.log(result);
      const name = result.name
      // 还需发送ajax请求，获取城市的详细信息
      const res = await axios.get('http://localhost:8080/area/info', {
        params: {
          name: name
        }
      })
      const { status, body } = res.data
      if (status === 200) {
        // 存储到localStrage中
        localStorage.setItem('current_city', JSON.stringify(body))
        this.setState({
          cityName: body.label
        })
      }
    })
  }
  renderswipers() {
    if (!this.state.isLoaded) {
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
  async getcomtent() {
    const res = await axios.get(
      'http://localhost:8080/home/groups?area=AREA%7C88cff55c-aaa4-e2e0'
    )
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        comtent: body
      })
    }
  }
  rendercomtent() {
    return (
      <div>
        {this.state.comtent.map(itema => (
          <div className="item" key={itema.id}>
            <div className="left">
              <p>{itema.title}</p>
              <p>{itema.desc}</p>
            </div>
            <div className="rigth">
              <img src={`http://localhost:8080${itema.imgSrc}`} alt="" />
            </div>
          </div>
        ))}
      </div>
    )
  }
  async getinfo() {
    const res = await axios.get('http://localhost:8080/home/news', {
      params: {
        area: 'AREA|88cff55c-aaa4-e2e0'
      }
    })
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        info: body
      })
    }
  }
  renderinfo() {
    return (
      <>
        {this.state.info.map(item => (
          <div className="news-item" key={item.id}>
            <div className="imgwrap">
              <img
                className="img"
                src={`http://localhost:8080${item.imgSrc}`}
                alt=""
              />
            </div>
            <Flex className="content" direction="column" justify="between">
              <h3 className="title">{item.title}</h3>
              <Flex className="info" justify="between">
                <span>{item.from}</span>
                <span>{item.data}</span>
              </Flex>
            </Flex>
          </div>
        ))}
      </>
    )
  }

  render() {
    return (
      <div className="index">
        <div className="swipers">{this.renderswipers()}</div>
        <div className="nav">
          <Flex>
            <Flex.Item>
              <Link to="home/house">
                <img src={Nav1} alt="" />
                <p>整租</p>
              </Link>
            </Flex.Item>
            <Flex.Item>
              <Link to="home/house">
                <img src={Nav2} alt="" />
                <p>合租</p>
              </Link>
            </Flex.Item>
            <Flex.Item>
              <Link to="map">
                <img src={Nav3} alt="" />
                <p>地图找房</p>
              </Link>
            </Flex.Item>
            <Flex.Item>
              <Link to="rent">
                <img src={Nav4} alt="" />
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
        <div className="info">
          <h3 className="group-title">最新资讯</h3>
          {this.renderinfo()}
          {/* <div className="news-item">
            <div className="imgwrap">
              <img
                className="img"
                src="http://localhost:8080/img/news/1.png"
                alt=""
              />
            </div>
            <Flex className="content" direction="column" justify="between">
              <h3 className="title">
                置业选择 | 安贞西里 三室一厅 河间的古雅别院
              </h3>
              <Flex className="info" justify="between">
                <span>新华网</span>
                <span>两天前</span>
              </Flex>
            </Flex>
          </div> */}
        </div>
        <div className="search">
          <Flex className="search-box">
            <Flex className="search-form">
              <div
                className="location"
                onClick={() => {
                  this.props.history.push('/City')
                }}
              >
                <span className="name">{this.state.cityName}</span>
                <i className="iconfont icon-arrow"> </i>
              </div>
              <div className="search-input">
                <i className="iconfont icon-seach" />
                <span className="text">请输入小区地址</span>
              </div>
            </Flex>
            {/* 地图小图标 */}
            <i
              className="iconfont icon-map"
              onClick={() => {
                this.props.history.push('/Map')
              }}
            />
          </Flex>
        </div>
      </div>
    )
  }
}

export default Index
