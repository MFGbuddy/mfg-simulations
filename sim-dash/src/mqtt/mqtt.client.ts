import mqtt from 'mqtt';

const mqttClient = mqtt.connect('ws://test.mosquitto.org:8080', {
  clientId: 'iiot_simulator',
  keepalive: 60,
});

export default mqttClient;
