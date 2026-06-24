import { useEffect, useState } from "react";
import api from "../services/api";

function Guardians() {

  const [guardians, setGuardians] =
    useState([]);

  useEffect(() => {

    loadGuardians();

  }, []);

  async function loadGuardians() {

    try {

      const devicesRes =
        await api.get("/devices");

      const devices =
        devicesRes.data;

      let allGuardians = [];

      for (const device of devices) {

        try {

          const guardianRes =
            await api.get(
              `/guardians/${device.deviceId}`
            );

          const deviceGuardians =
            guardianRes.data.map(g => ({
              ...g,
              deviceId:
                device.deviceId
            }));

          allGuardians.push(
            ...deviceGuardians
          );

        } catch (err) {

          console.log(err);

        }

      }

      setGuardians(
        allGuardians
      );

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <div>

      <h1>
        Guardians
      </h1>

      <table
        border="1"
        width="100%"
      >

        <thead>

          <tr>

            <th>
              Device
            </th>

            <th>
              Name
            </th>

            <th>
              Mobile
            </th>

          </tr>

        </thead>

        <tbody>

          {guardians.map(
            (g, index) => (

              <tr
                key={index}
              >

                <td>
                  {g.deviceId}
                </td>

                <td>
                  {g.name}
                </td>

                <td>
                  {g.mobile}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  );

}

export default Guardians;