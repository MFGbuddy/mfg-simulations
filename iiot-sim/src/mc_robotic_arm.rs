struct RoboticArm {
    machine_id: String,
    joint_1_angle: f32,         // degrees
    joint_2_angle: f32,         // degrees
    joint_3_angle: f32,         // degrees
    joint_4_angle: f32,         // degrees
    gripper_force: f32,         // N
    payload_weight: f32,        // kg
    cycle_time: f32,            // seconds
    temperature: f32,           // °C
    collision_detected: bool,
}