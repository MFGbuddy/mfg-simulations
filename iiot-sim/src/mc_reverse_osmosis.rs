struct ReverseOsmosis {
    machine_id: String,
    inlet_pressure: f32,        // bar
    outlet_pressure: f32,       // bar
    membrane_pressure: f32,     // bar
    conductivity: f32,          // µS/cm
    permeate_flow_rate: f32,    // L/h
    concentrate_flow_rate: f32, // L/h
    differential_pressure: f32, // bar
    cleaning_required: bool,
}