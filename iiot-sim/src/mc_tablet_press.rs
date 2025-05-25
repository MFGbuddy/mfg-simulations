use std::{sync::{Arc, Mutex}, thread};

use chrono::{DateTime, Utc};
use serde::Serialize;

use crate::{machine::{simulate_value, Machine, MachineType}, mqtt_client::MqttPublisher};


#[derive(Serialize)]
pub struct TabletPress {
    machine_id: String,
    hopper_level: f32,      // %
    compression_force: f32, // kN
    turret_speed: u16,      // RPM
    tablet_hardness: f32,   // kp
    ejection_force: f32,    // N
    tablet_weight: f32,     // mg
    reject_count: u32,      // tablets
    temperature: f32,       // °C
    vibration_alert: bool,
    timestamp: DateTime<Utc>,
}

impl Machine for TabletPress {
    fn new(machine_id: String) -> Self {
        TabletPress {
            machine_id,
            hopper_level: 0.0,
            compression_force: 0.0,
            turret_speed: 0,
            tablet_hardness: 0.0,
            ejection_force: 0.0,
            tablet_weight: 0.0,
            reject_count: 0,
            temperature: 0.0,
            vibration_alert: false,
            timestamp: Utc::now(),
        }
    }

    fn machine_type(&self) -> MachineType {
        MachineType::TabletPress
    }

    fn simulate_data(&mut self) -> String {
        self.hopper_level = simulate_value(30.0, 70.0, 10.0, 90.0);
        self.compression_force = simulate_value(60.0, 90.0, 50.0, 100.0);
        self.turret_speed = simulate_value(50.0, 90.0, 30.0, 100.0) as u16;
        self.tablet_hardness = simulate_value(6.0, 8.0, 5.0, 9.0);
        self.ejection_force = simulate_value(200.0, 400.0, 150.0, 450.0);
        self.tablet_weight = simulate_value(480.0, 520.0, 450.0, 550.0);
        self.reject_count = simulate_value(0.0, 1.0, 0.0, 5.0) as u32;
        self.temperature = simulate_value(40.0, 60.0, 30.0, 80.0);
        self.vibration_alert = rand::random::<bool>();
        self.timestamp = Utc::now();

        serde_json::to_string(self).unwrap()
    }

    fn send_to_dashboard(self, mqtt: Arc<MqttPublisher>) {
        let topic = format!("iiot-dashboard");
        println!("Publishing to topic: {}", topic);

        let machine = Arc::new(Mutex::new(self));
        let topic_clone = topic.clone();    
        let machine_clone = Arc::clone(&machine);
        let mqtt_clone = Arc::clone(&mqtt);

        thread::spawn(move || {
            loop {
                std::thread::sleep(std::time::Duration::from_secs(1));
                let mut machine = machine_clone.lock().unwrap();
                let payload = machine.simulate_data();
                println!("Publishing data: {}", payload);
                mqtt_clone.publish(&topic_clone, &payload);
            }
        }).join().unwrap();
        
    }
}
