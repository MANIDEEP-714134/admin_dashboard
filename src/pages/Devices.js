import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";


function Devices() {
  const [newDevice, setNewDevice] =
    useState({
      deviceId: "",
      broker: "",
      port: 1883,
      topic: ""
    });

  const [devices, setDevices] =
    useState([]);

  useEffect(() => {

    loadDevices();

  }, []);

  async function deleteDevice(
  deviceId
) {

  try {

    await api.delete(
      `/devices/${deviceId}`
    );

    loadDevices();

  } catch (err) {

    console.log(err);

  }

}

  async function loadDevices() {

    try {

      const res =
        await api.get("/devices");

      setDevices(res.data);

    } catch (err) {

      console.log(err);

    }

  }

  async function addDevice() {

    try {

      await api.post(
        "/devices",
        newDevice
      );

      setNewDevice({
        deviceId: "",
        broker: "",
        port: 1883,
        topic: ""
      });

      loadDevices();

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <div>

      <h1>Devices</h1>
      <h2>Add Device</h2>

      <input
        placeholder="Device ID"
        value={newDevice.deviceId}
        onChange={(e) =>
          setNewDevice({
            ...newDevice,
            deviceId: e.target.value
          })
        }
      />

      <input
        placeholder="Broker"
        value={newDevice.broker}
        onChange={(e) =>
          setNewDevice({
            ...newDevice,
            broker: e.target.value
          })
        }
      />

      <input
        placeholder="Port"
        type="number"
        value={newDevice.port}
        onChange={(e) =>
          setNewDevice({
            ...newDevice,
            port: Number(e.target.value)
          })
        }
      />

      <input
        placeholder="Topic"
        value={newDevice.topic}
        onChange={(e) =>
          setNewDevice({
            ...newDevice,
            topic: e.target.value
          })
        }
      />

      <button onClick={addDevice}>
        Add Device
      </button>

      <hr />

      <table border="1">

  <thead>

    <tr>

      <th>Device ID</th>
      <th>Broker</th>
      <th>Port</th>
      <th>Topic</th>
      <th>Details</th>
      <th>Action</th>

    </tr>

  </thead>

  <tbody>

    {devices.map(device => (

      <tr
        key={device.deviceId}
      >

        <td>
          {device.deviceId}
        </td>

        <td>
          {device.broker}
        </td>

        <td>
          {device.port}
        </td>

        <td>
          {device.topic}
        </td>

        <td>

          <Link
            to={`/device/${device.deviceId}`}
          >
            <button>
              View
            </button>
          </Link>

        </td>

        <td>

          <button
            onClick={() => {

              const ok =
                window.confirm(
                  `Delete ${device.deviceId}?`
                );

              if (ok) {

                deleteDevice(
                  device.deviceId
                );

              }

            }}
          >
            Delete
          </button>

        </td>

      </tr>

    ))}

  </tbody>

</table>

    </div>

  );

}

export default Devices;