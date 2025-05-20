
use paho_mqtt as mqtt;

pub struct MqttPublisher {
    client: mqtt::Client,
}

impl MqttPublisher {
    pub fn new(broker_uri: &str, client_id: &str) -> Self {
        let create_opts = mqtt::CreateOptionsBuilder::new()
            .server_uri(broker_uri)
            .client_id(client_id)
            .finalize();

        let client = mqtt::Client::new(create_opts).expect("Failed to create MQTT client");

        let conn_opts = mqtt::ConnectOptionsBuilder::new()
            .keep_alive_interval(std::time::Duration::from_secs(20))
            .clean_session(true)
            .finalize();

        client.connect(conn_opts).expect("Failed to connect");

        MqttPublisher { client }
    }

    pub fn publish(&self, topic: &str, payload: &str) {
        let msg = mqtt::MessageBuilder::new()
            .topic(topic)
            .payload(payload)
            .qos(1)
            .finalize();

        self.client.publish(msg).unwrap();
    }
}