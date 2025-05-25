import type { MqttAction, MqttState } from './mqtt.types';

export const initialState: MqttState = {
  message: undefined,
};

export function mqttReducer(state: MqttState, action: MqttAction): MqttState {
  switch (action.type) {
    case 'MQTT_MESSAGE':
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
}
