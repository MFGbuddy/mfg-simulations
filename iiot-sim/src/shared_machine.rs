use std::sync::{Arc, Mutex};

#[derive(Clone)]
pub enum ActiveMachine {
    None,
    TabletPress,
    // CentrifugalPump,
    // GasTurbineGenerator,
    // CNCMillingMachine,
    // ReverseOsmosis,
    // RoboticArm
}

pub type SharedState = Arc<Mutex<ActiveMachine>>;