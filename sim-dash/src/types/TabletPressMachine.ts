export interface TabletPressMachine {

    machine_id: string;
    hopper_level: number;      // %
    compression_force: number; // kN
    turret_speed: number;      // RPM
    tablet_hardness: number;   // kp
    ejection_force: number;    // N
    tablet_weight: number;     // mg
    reject_count: number;      // tablets
    temperature: number;       // °C
    vibration_alert: boolean;
    timestamp: string;
} 