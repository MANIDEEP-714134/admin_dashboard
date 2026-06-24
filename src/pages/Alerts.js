import { useEffect, useState } from "react";
import api from "../services/api";

function Alerts() {

  const [alerts, setAlerts] =
    useState([]);

  useEffect(() => {

    loadAlerts();

    const timer =
      setInterval(
        loadAlerts,
        5000
      );

    return () =>
      clearInterval(timer);

  }, []);

  async function loadAlerts() {

    try {

      const res =
        await api.get(
          "/alerts"
        );

      setAlerts(
        res.data.reverse()
      );

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <div>

      <h1>
        Alerts
      </h1>

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
              Alert
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

          {alerts.map(
            (alert, index) => (

              <tr
                key={index}
              >

                <td>

                  {
                    new Date(
                      alert.timestamp
                    ).toLocaleString()
                  }

                </td>

                <td>
                  {
                    alert.deviceId
                  }
                </td>

                <td>
                  {
                    alert.message
                  }
                </td>

                <td>
                  {
                    alert.value
                  }
                </td>

                <td>
                  {
                    alert.limit
                  }
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  );

}

export default Alerts;