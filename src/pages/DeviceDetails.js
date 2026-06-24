import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { Link } from "react-router-dom";


import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function DeviceDetails() {


    const [guardians, setGuardians] =
        useState([]);

    const [newGuardian, setNewGuardian] =
        useState({
            name: "",
            mobile: ""
        });
    const { deviceId } = useParams();

    const [live, setLive] = useState({});

    const [history, setHistory] = useState([]);

    const [thresholds, setThresholds] = useState({
        IR_max: "",
        IY_max: "",
        IB_max: ""
    });

    const offline =
        !live.timestamp ||
        Date.now() - live.timestamp > 60000;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {

        loadGuardians();
        loadThresholds();
        loadLive();
        loadHistory();

        const timer = setInterval(() => {

            loadLive();
            loadHistory();

        }, 3000);

        return () => clearInterval(timer);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deviceId]);

    async function loadGuardians() {

        try {

            const res =
                await api.get(
                    `/guardians/${deviceId}`
                );

            setGuardians(
                res.data
            );

        } catch (err) {

            console.log(err);

        }

    }

    async function addGuardian() {

        try {

            await api.post(
                `/guardians/${deviceId}`,
                newGuardian
            );

            setNewGuardian({
                name: "",
                mobile: ""
            });

            loadGuardians();

        } catch (err) {

            console.log(err);

        }

    }

    async function deleteGuardian(id) {

        try {

            await api.delete(
                `/guardians/${id}`
            );

            loadGuardians();

        } catch (err) {

            console.log(err);

        }

    }


    async function loadLive() {

        try {

            const res =
                await api.get(
                    `/live/${deviceId}`
                );

            setLive(res.data);

        } catch (err) {

            console.log(err);

        }

    }

    async function loadHistory() {

        try {

            const res =
                await api.get(
                    `/history/${deviceId}`
                );

            setHistory(
                res.data.slice(-50)
            );

        } catch (err) {

            console.log(err);

        }

    }

    async function loadThresholds() {

        try {

            const res =
                await api.get(
                    `/thresholds/${deviceId}`
                );

            setThresholds(
                res.data || {
                    IR_max: "",
                    IY_max: "",
                    IB_max: ""
                }
            );

        } catch (err) {

            console.log(err);

        }

    }

    async function saveThresholds() {

        try {

            await api.post(
                `/thresholds/${deviceId}`,
                thresholds
            );

            alert(
                "Thresholds Saved Successfully"
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
                Device: {deviceId}
            </h1>
            <p>
                Status:
                {
                    offline
                        ? "🔴 Offline"
                        : "🟢 Online"
                }
            </p>
            <hr />

            <h2>
                Live Data
            </h2>

            <p>
                <strong>IR:</strong> {live.IR}
            </p>

            <p>
                <strong>IY:</strong> {live.IY}
            </p>

            <p>
                <strong>IB:</strong> {live.IB}
            </p>

            <p>
                <strong>Status:</strong> {live.status}
            </p>

            <hr />

            <h2>
                History Graph
            </h2>

            <div
                style={{
                    width: "100%",
                    height: 400
                }}
            >

                <ResponsiveContainer>

                    <LineChart data={history}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="timestamp"
                            tickFormatter={(value) =>
                                new Date(value)
                                    .toLocaleTimeString()
                            }
                        />

                        <YAxis />

                        <Tooltip
                            labelFormatter={(value) =>
                                new Date(value)
                                    .toLocaleString()
                            }
                        />

                        <Line
                            type="monotone"
                            dataKey="IR"
                            name="IR"
                        />

                        <Line
                            type="monotone"
                            dataKey="IY"
                            name="IY"
                        />

                        <Line
                            type="monotone"
                            dataKey="IB"
                            name="IB"
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

            <hr />

            <h2>
                Threshold Settings
            </h2>

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap"
                }}
            >

                <div>

                    <label>
                        IR Max
                    </label>

                    <br />

                    <input
                        type="number"
                        step="0.01"
                        value={thresholds.IR_max || ""}
                        onChange={(e) =>
                            setThresholds({
                                ...thresholds,
                                IR_max: Number(
                                    e.target.value
                                )
                            })
                        }
                    />

                </div>

                <div>

                    <label>
                        IY Max
                    </label>

                    <br />

                    <input
                        type="number"
                        step="0.01"
                        value={thresholds.IY_max || ""}
                        onChange={(e) =>
                            setThresholds({
                                ...thresholds,
                                IY_max: Number(
                                    e.target.value
                                )
                            })
                        }
                    />

                </div>

                <div>

                    <label>
                        IB Max
                    </label>

                    <br />

                    <input
                        type="number"
                        step="0.01"
                        value={thresholds.IB_max || ""}
                        onChange={(e) =>
                            setThresholds({
                                ...thresholds,
                                IB_max: Number(
                                    e.target.value
                                )
                            })
                        }
                    />

                </div>

            </div>

            <br />

            <button
                onClick={saveThresholds}
            >
                Save Thresholds
            </button>
            <hr />

            <h2>
                Guardians
            </h2>

            {guardians.map((g, index) => (

                <div
                    key={index}
                    style={{
                        marginBottom: "10px"
                    }}
                >

                    {g.name}
                    {" - "}
                    {g.mobile}

                    <button
                        style={{
                            marginLeft: "10px"
                        }}
                        onClick={() =>
                            deleteGuardian(g._id)
                        }
                    >
                        Delete
                    </button>

                </div>

            ))}

            <br />

            <input
                placeholder="Name"
                value={newGuardian.name}
                onChange={(e) =>
                    setNewGuardian({
                        ...newGuardian,
                        name: e.target.value
                    })
                }
            />

            <input
                placeholder="Mobile"
                value={newGuardian.mobile}
                onChange={(e) =>
                    setNewGuardian({
                        ...newGuardian,
                        mobile: e.target.value
                    })
                }
            />

            <button
                onClick={addGuardian}
            >
                Add Guardian
            </button>

            <Link to="/devices">
                <button>← Back to Devices</button>
            </Link>
        </div>

    );

}

export default DeviceDetails;