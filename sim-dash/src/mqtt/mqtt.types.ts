export interface MachinePayload {
  data: any;
}

export type MqttAction = {
  type: 'MQTT_MESSAGE';
  payload: MachinePayload;
};

export interface MqttState {
  message: MachinePayload | undefined;
}