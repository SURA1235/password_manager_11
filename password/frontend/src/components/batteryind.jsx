import React, { useEffect, useRef, useState } from "react";

const BatteryIndicator = () => {
    const levelRef = useRef(null);
    const infoRef = useRef(null);
    const [batteryLevel, setBatteryLevel] = useState(0);
    const [isCharging, setIsCharging] = useState(false);

    useEffect(() => {
        navigator.getBattery().then((battery) => {
            const updateBattery = () => {
                const level = Math.floor(battery.level * 100);
                setBatteryLevel(level);
                setIsCharging(battery.charging);
            };

            updateBattery();
            battery.addEventListener("levelchange", updateBattery);
            battery.addEventListener("chargingchange", updateBattery);

            return () => {
                battery.removeEventListener("levelchange", updateBattery);
                battery.removeEventListener("chargingchange", updateBattery);
            };
        });
    }, []);

    let bgColor = "#03fc20";
    if (batteryLevel <= 25) bgColor = "red";
    else if (batteryLevel <= 40) bgColor = "orangered";

    return (
        <>
        <div
            id="battery"
            style={{
                position: "fixed",
                width: "55px",
                height: "2rem",
                border: "2px solid #333",
                backgroundColor: "#eee",
                overflow: "hidden",
                borderRadius: "10px",
                left: "5vw",
                top: "5vh"
            }}
        >
            <div
                id="level"
                ref={levelRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${batteryLevel}%`,
                    height: "100%",
                    backgroundColor: bgColor,
                    zIndex: 1,
                    transition: "width 0.3s",
                }}
            ></div>
            <div
                id="info"
                ref={infoRef}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 2,
                    color: "rgb(20, 19, 19)",
                    fontWeight: "bold",
                    fontSize: "12px",
                }}
            >
                {batteryLevel}%{isCharging ? "⚡" : ""}
            </div>
          </div>
            {/* <div className="w-1 h-10 absolute top-[7vh] left-[16vh] bg-white">  h</div> */}
        
        </>
    );
};

export default BatteryIndicator;
