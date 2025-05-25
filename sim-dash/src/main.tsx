import { createRoot } from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import TabletPressMachineComponent from './components/TabletPressMachineComponent.tsx';
import { MqttProvider } from './mqtt/mqtt.provider.tsx';

const router = createBrowserRouter([
  {
    path: "/tabletpress",
    element: <TabletPressMachineComponent />
  }
])

createRoot(document.getElementById('root')!).render(

  <MqttProvider>
    <RouterProvider router={router} />
  </MqttProvider>
)