import styles from "./hero.module.css";
import heroImg from "../../../../assets/bg-logo.png";

const Hero = () => {
    return (
        <section className={styles.hero}>
            {/* BACKGROUND IMAGE */}
            <img src={heroImg} alt="hero" className={styles.heroImg} />

            {/* FLOATING CARD */}
            <div className={styles.card}>
                <p className={styles.tag}>New Arrival</p>

                <h1>
                    Discover Our <br /> New Collection
                </h1>

                <p className={styles.desc}>
                    Elevate your living space with thoughtfully designed furniture that blends comfort, style, and timeless elegance.
                </p>

                <button>BUY NOW</button>
            </div>
        </section>
    );
};

export default Hero;