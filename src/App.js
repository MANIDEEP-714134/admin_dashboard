import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import Guardians from "./pages/Guardians";
import Alerts from "./pages/Alerts";
import DeviceDetails from "./pages/DeviceDetails";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/guardians" element={<Guardians />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/device/:deviceId" element={<DeviceDetails />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;