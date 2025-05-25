use std::{sync::{Arc, Mutex}, thread, time::Duration};
use crate::machine::{Machine};
use crate::shared_machine::ActiveMachine;
use crate::mc_tablet_press::TabletPress;
use crate::mqtt_client::MqttPublisher;

pub fn start_simulation_loop(
    state: Arc<Mutex<ActiveMachine>>,
    mqtt: Arc<MqttPublisher>,
) {
    let tablet_press = Arc::new(Mutex::new(TabletPress::new("TP-001".to_string())));

    thread::spawn(move || {
        loop {
            std::thread::sleep(Duration::from_secs(1));

            let current = state.lock().unwrap().clone(); // Clone the enum value

            match current {
                ActiveMachine::TabletPress => {
                    let mut tp = tablet_press.lock().unwrap();
                    let data = tp.simulate_data();
                    mqtt.publish("iiot-dashboard", &data);
                }
                ActiveMachine::None => {
                    // No machine selected — skip
                }
            }
        }
    });
}
