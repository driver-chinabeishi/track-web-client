import React from 'react'
import AMapLoader from "@amap/amap-jsapi-loader";
import './track-map.css'

class TrackMap extends React.Component {

  map = null
  geolocation = null

  constructor (props) {
    super(props)
    this.state = {
      position: {
        lng: 0,
        lat: 0,
        KL: 0,
        kT: 0
      }
    }
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
        extensions: 'all', // 是否需要详细的逆地理编码信息，默认为'base'只返回基本信息，可选'all',
        // noIpLocate: true, // 是否彬IP精确定位
      })
      // setInterval(() => {
        this.getPosition()
      // }, 1000)

    }).catch(e => {
      console.log('getLocation error: ', e)
    })
  }

  getPosition () {
    this.geolocation.getCurrentPosition((type, result) => {
      console.log('=====', result)
      if (result && result.position) {
        this.setState({position: result.position})
        this.map.setCenter([result.position.KL, result.position.kT], true, 1000)
        this.map.setZoom(18)
      }

    })
  }

  render () {
    let {lng, lat, kT, KL} = this.state.position
    console.log('----', lng, lat)
    return (
      <div className="track-map g-flex g-flex-v">
        <div className="g-flex g-w100 g-h-100 g-flex-wap">
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
