import React from 'react'
import House from './House'
import Index from './Index/index.js'
import My from './My'
import News from './News'
import { Route, Switch } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import './index.scss'
const itemList = [
  { title: '首页', icon: 'icon-ind', path: '/home' },
  { title: '找房', icon: 'icon-findHouse', path: '/home/house' },
  { title: '资讯', icon: 'icon-infom', path: '/home/news' },
  { title: '我的', icon: 'icon-my', path: '/home/my' }
]

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 默认选中的高亮
      selectedTab: props.location.pathname
      // 控制导航显示隐藏
      // hidden: false,
      // 控制样式
      // fullScreen: true,
    }
  }
  // 渲染内容的
  // renderContent(pageText) {
  //   return (
  //     <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
  //       <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
  //       <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
  //         onClick={(e) => {
  //           e.preventDefault();
  //           this.setState({
  //             hidden: !this.state.hidden,
  //           });
  //         }}
  //       >
  //         Click to show/hide tab-bar
  //       </a>
  //       <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
  //         onClick={(e) => {
  //           e.preventDefault();
  //           this.setState({
  //             fullScreen: !this.state.fullScreen,
  //           });
  //         }}
  //       >
  //         Click to switch fullscreen
  //       </a>
  //     </div>
  //   );
  // }
  gettabbar() {
    return itemList.map(item => 
    <TabBar.Item
      title={item.title}
      key={item.title}
      // icon={ <i className={`iconfoot ${item.icon}`} /> }
      // selectedIcon={ <i className={`iconfoot ${item.icon}`} /> }
      icon={<i className={`iconfont ${item.icon}`} />}
      selectedIcon={<i className={`iconfont ${item.icon}`} />}
      // 控制默认高亮
      selected={this.state.selectedTab === item.path }
      // 图标旁边的提示内容
      // badge={1}
      // 点击事件，点谁选中谁
      onPress={() => {
        this.props.history.push(item.path)
      }}
    >
      {/* 表示显示中间显示的 */}
      {/* {this.renderContent('Life')} */}
    </TabBar.Item>
    )
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps)
    console.log('home组件更新了')
    // this.props可以获取到最新的props
    console.log(this.props)
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }
  }
  
  render() {
    return (
      <div className="home">
        <Switch>
          <Route path="/home/house" component={House} />
          <Route exact path="/home" component={Index} />
          <Route path="/home/my" component={My} />
          <Route path="/home/news" component={News} />
        </Switch>
        <div className="tabBar">
          {/* <div
        控制样式
         style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}
        > */}
          <TabBar
            // 没选中的字体颜色
            unselectedTintColor="#949494"
            // 选中的字体颜色
            tintColor="#33A3F4"
            // 导航的背景色
            barTintColor="white"
            // 控制导航隐藏显示
            // hidden={this.state.hidden}
          >
          {this.gettabbar()}
          {/* </div> */}
          </TabBar>
        </div>
      </div>
    )
  }
}

export default Home
