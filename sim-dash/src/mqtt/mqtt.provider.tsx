import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import mqttClient from '../mqtt/mqtt.client';
import { mqttReducer, initialState } from '../mqtt/mqtt.reducer';
import type { MqttAction, MqttState } from '../mqtt/mqtt.types';

import mqtt from 'mqtt';

const MqttContext = createContext<{
    state: MqttState;
    dispatch: React.Dispatch<MqttAction>;
} | undefined>(undefined);

export const MqttProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(mqttReducer, initialState);

    const [client, setClient] = useState<any>(null)

    useEffect(() => {
        const mqttClient = mqtt.connect('ws://test.mosquitto.org:8080', {
            clientId: 'iiot_simulator_react',
            keepalive: 60,
        });

        setClient(mqttClient);
    }, [])

    useEffect(() => {

        console.log(client)
        if (client) {
            mqttClient.on('connect', () => {
                console.log('Connected to broker');
                mqttClient.subscribe('iiot-dashboard', { qos: 1 })
            });

            mqttClient.on('message', (_, message) => {
                try {
                    const data = JSON.parse(message.toString());
                    console.log(data);
                    dispatch({
                        type: 'MQTT_MESSAGE',
                        payload: { data },
                    });
                } catch (e) {
                    console.error('Invalid message', e);
                }
            });
        }

    }, [client]);

    return (
        <MqttContext.Provider value={{ state, dispatch }}>
            {children}
        </MqttContext.Provider>
    );
};

export const useMqtt = () => {
    const ctx = useContext(MqttContext);
    if (!ctx) throw new Error('useMqtt must be used within MqttProvider');
    return ctx;
};