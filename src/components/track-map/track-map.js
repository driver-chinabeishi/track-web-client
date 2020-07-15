import React from 'react'
import AMapLoader from "@amap/amap-jsapi-loader";
import './track-map.css'

class TrackMap extends React.Component {

  map = null
  geolocation = null

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      position: {
        lng: 0,
        lat: 0,
        KL: 0,
        kT: 0
      }
    }

  }

  componentDidMount() {
    this.initMap()
  }

  initMap () {

    AMapLoader.load({
      key: 'bd9a296ef3bd9ccb96d013239a125ba3',
      version: '2.0',
      plugins: ['AMap.Geolocation']
    }).then((AMap) => {
      this.map = new AMap.Map('track-map')
      this.geolocation = new AMap.Geolocation({
        offset: [0,0],
        convert: true,
        timeout: 10000, // 超时时间
        extensions: 'all', // 是否需要详细的逆地理编码信息，默认为'base'只返回基本信息，可选'all',
        // noIpLocate: 0, // 是否禁用IP精确定位，默认为0，0:都用 1:手机上不用 2:PC上不用 3:都不用
        // noGeoLocation: 0, // 是否禁用浏览器原生定位，默认为0，0:都用 1:手机上不用 2:PC上不用 3:都不用

        enableHighAccuracy: true, // 是否使用高精度定位，默认：true
        maximumAge: 0, // 定位缓存，默认：0
        showButton: true, // 显示定位按钮，默认：true
        buttonPosition: 'LB',
        buttonOffset: new AMap.Pixel(10, 20),
        showMarker: true,
        panToLocation: true,
        zoomToAccuracy: true

      })
      // setInterval(() => {
        this.getPosition()
      // }, 1000)

    }).catch(e => {
      console.log('getLocation error: ', e)
    })
  }

  getPosition () {
    this.setState({loading: true})
    this.geolocation.getCurrentPosition((status, result) => {
      console.log('=====', result)
      this.setState({loading: false})
      if (status === 'complete' && result && result.position) {
        this.setState({position: result.position})
        // this.map.setCenter([result.position.KL, result.position.kT], true, 1000)
        // this.map.setZoom(18)
      }
    })
  }

  render () {
    let {lng, lat, kT, KL} = this.state.position
    let {loading} = this.state
    console.log('----', lng, lat)
    return (
      <div className="track-map g-flex g-flex-v">
        <div className="g-flex g-w100 g-h-100 g-flex-wap">
          <div className="g-ml-12">定位状态：{loading ? '定位中...' : '定位结束'}</div>
          <div className="g-ml-12">lng:  {lng}</div>
          <div className="g-ml-12"> | lat: {lat}</div>
          <div className="g-ml-12"> | KL: {KL}</div>
          <div className="g-ml-12"> | kT: {kT}</div>
        </div>
        <div id='track-map' className="g-flex g-flex-c1"></div>
      </div>
    )
  }
}

export default TrackMap
