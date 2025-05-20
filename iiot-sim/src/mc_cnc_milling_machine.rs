struct CNCMillingMachine {
    machine_id: String,
    spindle_speed: f32,         // RPM
    feed_rate: f32,             // mm/min
    tool_temperature: f32,      // °C
    x_axis_position: f32,       // mm
    y_axis_position: f32,       // mm
    z_axis_position: f32,       // mm
    tool_wear: f32,             // %
    load_torque: f32,           // Nm
    error_code: Option<String>,
}