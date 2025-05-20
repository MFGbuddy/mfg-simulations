struct CentrifugalPump {
    machine_id: String,
    flow_rate: f32,             // m3/h
    suction_pressure: f32,      // bar
    discharge_pressure: f32,    // bar
    motor_temperature: f32,     // °C
    bearing_vibration: f32,     // mm/s
    power_consumption: f32,     // kW
    seal_leakage_alert: bool,
}

