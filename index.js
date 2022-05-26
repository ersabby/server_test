const mqtt = require('mqtt')
const host = '192.168.1.136'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `mqtt://${host}:${port}`

const CONFIG_CMD_TYPE = 'A'
const publisher_topic = 'demo_publisher'
const subscriber_topic = 'demo_subscriber'

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
//   username: 'emqx',
//   password: 'public',
  reconnectPeriod: 1000,
})


client.on('connect', () => {
  console.log('Connected')
  client.subscribe(subscriber_topic, () => {
    console.log(`Subscribe to topic '${subscriber_topic}'`)
  })

  client.publish(publisher_topic, '1', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
})

client.on('message', (publisher_topic, payload) => {
    let MqttData = payload.toString()
    console.log('Received Message:', payload.toString())
    switch(MqttData[0]){
        case CONFIG_CMD_TYPE:{
            console.log('VALID REQUEST RECEIVED');
        }break;
        default:{
            console.log('INVALID REQUEST RECEIVED');
        }break;
    }
})

/*send data after a specified timeout continuously*/
setInterval(()=>{
    client.publish(publisher_topic, "published message")
}, 2000)