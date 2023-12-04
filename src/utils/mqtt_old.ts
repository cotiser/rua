import { Message } from 'element-ui'
import mqtt from 'mqtt'
// mqttnext -> mqtt://b3351:scutb3351-mqtt@222.201.145.72:16666/b3351-window-blind/cover/front_cover/position/command (for curtain) -m [0~100]
// pub示例：mosquitto_pub -L 'mqtt://b3351:scutb3351-mqtt@222.201.145.72:16666/zigbee2mqtt/Back Light/left/set' -m 'OFF'
// 顺便 想看homeassistant自动发现的设备列表的话可以：
// mosquitto_sub -v -L 'mqtt://b3351:scutb3351-mqtt@222.201.145.72:16666/homeassistant/#'
// json含义参考：https://www.home-assistant.io/integrations/mqtt/#mqtt-discovery

const url = 'ws:222.201.144.170:9001'
const options = {
  username: 'b3351',
  password: 'scutb3351-mqtt',
  cleanSession: false,
  clientId: 'smarthome_fontend' + Date.now(),
  connectTimeout: 4000
}

// 初始化对象
export const mqttInit = Vue => {
  let mqttClient = mqtt.connect(url, options)
  mqttConnect(mqttClient) // 建立连接
  if (Vue) Vue.prototype.$mqtt = mqttClient // 绑定到全局
  return mqttClient
}

const mqttConnect = mqttClient => {
  // 建立连接
  mqttClient.on('connect', e => {
    console.log('成功连接服务器:', e)
  })
  // 重新连接
  mqttClient.on('reconnect', error => {
    console.log('正在重连:', error)
  })
  // 断开连接
  mqttClient.on('error', error => {
    console.log('连接失败：', error)
    Message.error({ message: 'MQTT连接失败！' })
    mqttClient.end()
  })
  // 监听获取信息
  mqttClient.on('message', (topic, message) => {
    // console.log('收到来自', topic, '的信息', message)
  })
  // 重写发布消息
  mqttClient.publish_ = mqttClient.publish
  mqttClient.publish = (topic, message) => {
    if (!mqttClient || !mqttClient.connected) {
      console.log('mqtt broker未连接')
      Message.error('mqtt broker未连接')
      return
    }
    mqttClient.publish_.call(mqttClient, topic, message, { qos: 1 }, err => {
      if (!err) {
        console.log('主题为' + topic + '发布成功')
        Message.success('消息发布成功')
      } else {
        console.error('报错啦', err)
        Message.success('消息发布失败')
      }
    })
  }
  return mqttClient
}

export const mqttMap = {
  open_door: '/smarthome/device/control/door/30AEA427B380',
  searchExtranceUsers: '/smarthome/device/control/door_request/30AEA427B380'
}
