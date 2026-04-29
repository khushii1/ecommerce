import styles from "./footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.top}>
                {/* LEFT */}
                <div className={styles.brand}>
                    <h2>Funiro.</h2>
                    <p>
                        400 University Drive Suite 200 Coral Gables, <br />
                        FL 33134 USA
                    </p>
                </div>

                {/* LINKS */}
                <div>
                    <h4>Links</h4>
                    <ul>
                        <li>Home</li>
                        <li>Shop</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </div>

                {/* HELP */}
                <div>
                    <h4>Help</h4>
                    <ul>
                        <li>Payment Options</li>
                        <li>Returns</li>
                        <li>Privacy Policies</li>
                    </ul>
                </div>

                {/* NEWSLETTER */}
                <div>
                    <h4>Newsletter</h4>
                    <div className={styles.newsletter}>
                        <input type="text" placeholder="Enter Your Email Address" />
                        <button>SUBSCRIBE</button>
                    </div>
                </div>
            </div>

            {/* BOTTOM */}
            <div className={styles.bottom}>
                <p>2026 furniro. All rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;