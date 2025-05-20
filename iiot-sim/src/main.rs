mod machine;
mod mc_tablet_press;
mod mqtt_client;

use std::sync::Arc;

use machine::Machine;
use mc_tablet_press::TabletPress;

fn main() {
    let mut tp = Box::new(TabletPress::new("TP-001".to_string()));

    let mqtt = Arc::new(mqtt_client::MqttPublisher::new(
        "tcp://test.mosquitto.org:1883", 
        "iiot_simulator"
    ));

    tp.send_to_dashboard(Arc::clone(&mqtt));
}
