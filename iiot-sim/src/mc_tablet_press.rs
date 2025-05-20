use std::{sync::{Arc, Mutex}, thread};

use crate::{machine::{simulate_value, Machine, MachineType}, mqtt_client::MqttPublisher};

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

        format!(
            "Machine ID: {}\nHopper Level: {:.2}%\nCompression Force: {:.2} kN\nTurret Speed: {} RPM\nTablet Hardness: {:.2} kp\nEjection Force: {:.2} N\nTablet Weight: {:.2} mg\nReject Count: {}\nTemperature: {:.2} °C\nVibration Alert: {}",
            self.machine_id,
            self.hopper_level,
            self.compression_force,
            self.turret_speed,
            self.tablet_hardness,
            self.ejection_force,
            self.tablet_weight,
            self.reject_count,
            self.temperature,
            self.vibration_alert
        )
    }

    fn send_to_dashboard(self, mqtt: Arc<MqttPublisher>) {
       let machine_id = self.machine_id.clone();
        let topic = format!("iiot/{:?}/{}", self.machine_type(), machine_id);
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
                mqtt_clone.publish(&topic_clone, &payload);
            }
        }).join().unwrap();
        
    }
}

// pradip 9145703999