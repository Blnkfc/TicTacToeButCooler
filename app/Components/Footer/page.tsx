import styles from "./Footer.module.css"

const Footer = () => {
    return <div className={styles.footer}>
        <h2>Contact me here</h2>
        <div className={styles.footer__contacts}>
            <div className={styles.footer__contacts__media} style={{backgroundImage: `url(https://i.imgur.com/sOHBZ5n.png)`}} ></div>
            <div className={styles.footer__contacts__media} style={{backgroundImage: `url(https://i.imgur.com/oQKEm8I.png)`}}  ></div>
            <div className={styles.footer__contacts__media} style={{backgroundImage: `url(https://i.imgur.com/Cm7zqOK.png)`}}  ></div>
            <div className={styles.footer__contacts__media} style={{backgroundImage: `url(https://i.imgur.com/nuTcvDH.png)`}}  ></div>
            <div className={styles.footer__contacts__media} style={{backgroundImage: `url(https://i.imgur.com/CYYMRhr.png)`}}  ></div>
        </div>
    </div>
}


export default Footer