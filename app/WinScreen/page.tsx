import Link from "next/link"
import styles from "./WinScreen.module.css"


const WinScreen = () => {

    
    function isEven(order:number) {
        return (order % 2 == 0);
    }


    return <div className={styles.WinScreen}>
        <div className={styles.WinScreen__alert} id={styles.first} > Winner!!! </div>
        <div className={styles.WinScreen__display} >
            <div className={styles.WinScreen__display__img}  ></div>
            <Link href={"/"} className={styles.WinScreen__display__btn}  > Restart </Link>
        </div>
        <div className={styles.WinScreen__alert} id={styles.second}  > Winner!!! </div> 
        
    </div>
}


export default WinScreen