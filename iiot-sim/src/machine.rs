use std::sync::Arc;

use rand::Rng;

use crate::mqtt_client::MqttPublisher;

#[derive(Debug)]
pub enum MachineType {
    TabletPress,
    CentrifugalPump,
    GasTurbineGenerator,
    CNCMillingMachine,
    ReverseOsmosis,
    RoboticArm
}


pub trait Machine {
    fn new(machine_id: String) -> Self;
    fn machine_type(&self) -> MachineType;
    fn simulate_data(&mut self) -> String;
    fn send_to_dashboard(self, mqtt: Arc<MqttPublisher>);
}

pub fn simulate_value(normal_low: f32, normal_high: f32, low: f32, high: f32) -> f32 {
    let mut rng = rand::rng();

    let anomaly = rng.random_bool(0.1); // 10% chance for anomaly
    if anomaly {
        if rng.random_bool(0.5) {
            if low < normal_low {
                rng.random_range(low..normal_low)
            } else {
                // fallback to normal range if invalid
                rng.random_range(normal_low..normal_high)
            }
        } else {
            if normal_high < high {
                rng.random_range(normal_high..high)
            } else {
                // fallback to normal range if invalid
                rng.random_range(normal_low..normal_high)
            }
        }
    } else {
        if normal_low < normal_high {
            rng.random_range(normal_low..normal_high)
        } else {
            // fallback to a constant if even normal range is invalid
            normal_low
        }
    }
}

