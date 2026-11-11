import { useEffect, useState } from "react";
import styles from "./circle.module.css"


const Circle = () => {
    const [time, setTime] = useState("00:00:00")

    const getTime = async () => {
        try{
            const resp = await fetch(`${import.meta.env.VITE_API_4_FRONT}/api/time` )

            if(!resp.ok){
                throw new Error("error occured")
            }
            const data = await resp.json()
            
            console.log(data.data);
            setTime(data.data.current.datetime.split("T")[1].slice(0, 8));
        }
        catch(error){
            console.log(error.message)
        }
    }
    useEffect(() => {
        getTime();

        const interval = setInterval(() => {
            getTime();
        }, 900);

        return () => clearInterval(interval);
    }, []);

    return <>
    <div className={styles.wrldtxtdiv}>
        <span classnName = {styles.wrldtxt}>
            Your Country Time
        </span>

    </div>
    <div className={styles.space}>
        <div className={styles.stars}></div>
        <div className={styles.stars2}></div>
        <div className={styles.stars3}></div>
    </div>

    <div className={styles.circle} onClick={getTime}>
        {/* Твой timeText */}
    </div>
        <div className = {styles.circle}>

        <span 
        key = {time}
        className={`${styles.timeAnimation} ${styles.timeText}`}>
            {time}
        </span>

        </div>
    </>
}

export default Circle