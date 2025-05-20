struct GasTurbineGenerator {
    machine_id: String,
    output_power: f32,          // MW
    rotor_speed: f32,           // RPM
    combustion_temperature: f32,// °C
    fuel_flow: f32,             // kg/s
    exhaust_temperature: f32,   // °C
    oil_pressure: f32,          // bar
    vibration_level: f32,       // mm/s
}