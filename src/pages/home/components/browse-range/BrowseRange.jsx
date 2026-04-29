import { useSelector } from 'react-redux';
import styles from './BrowseRande.module.css';






const BrowseRange = () => {
    const categorySelector = useSelector((state) => state.category.items || []);


    return (
        <section className={styles.section}>
            {/* TITLE */}
            <div className={styles.header}>
                <h2>Browse The Range</h2>
                <p>
                    Explore thoughtfully designed furniture categories crafted to suit
                    every corner of your home.
                </p>
            </div>

            {/* CARDS */}
            <div className={styles.grid}>
                {categorySelector.map((item) => (
                    <div key={item.id} className={styles.card}>
                        <img src={item.image} alt={item.name} />
                        <h3>{item.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BrowseRange;