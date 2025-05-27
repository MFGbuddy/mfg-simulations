import { createRoot } from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import TabletPressMachineComponent from './components/TabletPressMachineComponent.tsx';
import { MqttProvider } from './mqtt/mqtt.provider.tsx';
import { MainDashboard } from './components/MainDashboard.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainDashboard />
  },
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