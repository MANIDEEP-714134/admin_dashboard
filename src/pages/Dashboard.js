import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

  const [devices, setDevices] =
    useState([]);

  const [alerts, setAlerts] =
    useState([]);

  const [onlineCount,
    setOnlineCount] =
    useState(0);

  const [offlineCount,
    setOfflineCount] =
    useState(0);

  useEffect(() => {

    loadData();

    const timer =
      setInterval(
        loadData,
        5000
      );

    return () =>
      clearInterval(timer);

  }, []);

  async function loadData() {

    try {

      const devicesRes =
        await api.get(
          "/devices"
        );

      const alertsRes =
        await api.get(
          "/alerts"
        );

      setDevices(
        devicesRes.data
      );

      setAlerts(
        alertsRes.data
      );

      let online = 0;
      let offline = 0;

      for (
        const device
        of devicesRes.data
      ) {

        try {

          const liveRes =
            await api.get(
              `/live/${device.deviceId}`
            );

          const live =
            liveRes.data;

          if (
            live.timestamp &&
            Date.now() -
              new Date(
                live.timestamp
              ).getTime()
              <
              60000
          ) {

            online++;

          } else {

            offline++;

          }

        } catch {

          offline++;

        }

      }

      setOnlineCount(
        online
      );

      setOfflineCount(
        offline
      );

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <div
      style={{
        padding: "20px"
      }}
    >

      <h1>
        PMS Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4,1fr)",
          gap: "20px",
          marginTop: "20px"
        }}
      >

        <div
          className="card"
        >
          Devices:
          {" "}
          {devices.length}
        </div>

        <div
          className="card"
        >
          Alerts:
          {" "}
          {alerts.length}
        </div>

        <div
          className="card"
        >
          Online:
          {" "}
          {onlineCount}
        </div>

        <div
          className="card"
        >
          Offline:
          {" "}
          {offlineCount}
        </div>

      </div>

      <br />

      <h2>
        Recent Alerts
      </h2>

      <table
        border="1"
        width="100%"
      >

        <thead>

          <tr>

            <th>
              Time
            </th>

            <th>
              Device
            </th>

            <th>
              Message
            </th>

            <th>
              Value
            </th>

            <th>
              Limit
            </th>

          </tr>

        </thead>

        <tbody>

          {alerts
            .slice(-10)
            .reverse()
            .map((a, i) => (

              <tr key={i}>

                <td>

                  {
                    new Date(
                      a.timestamp
                    ).toLocaleString()
                  }

                </td>

                <td>
                  {a.deviceId}
                </td>

                <td>
                  {a.message}
                </td>

                <td>
                  {a.value}
                </td>

                <td>
                  {a.limit}
                </td>

              </tr>

            ))}

        </tbody>

      </table>

    </div>

  );

}

export default Dashboard;