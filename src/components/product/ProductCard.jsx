
import { useDispatch } from "react-redux";
import styles from "./productCard.module.css";
import { addToCart } from "../../redux/addToCartSlice";

const ProductCard = ({ item }) => {
    const dispatch = useDispatch();
    // 🔥 determine badge type
    const type = item.badge?.includes("-") ? "discount" : "new";

    return (
        <div className={styles.card}>
            {/* IMAGE */}
            <div className={styles.imgContainer}>
                <img src={item.mainImage} alt={item.title} />

                {/* BADGE */}
                {item.badge && (
                    <span className={`${styles.badge} ${styles[type]}`}>
                        {item.badge}
                    </span>
                )}

                {/* HOVER */}
                <div className={styles.overlay}>
                    <button onClick={() => dispatch(addToCart(item))}>Add to cart</button>
                    <div className={styles.actions}>
                        <span>Share</span>
                        <span>Compare</span>
                        <span>Like</span>
                    </div>
                </div>
            </div>

            {/* DETAILS */}
            <div className={styles.info}>
                <h3>{item.title}</h3>

                {/* 🔥 description from admin */}
                <p>
                    {item.description?.length > 50
                        ? item.description.slice(0, 50) + "..."
                        : item.description}
                </p>

                <div className={styles.price}>
                    <span>₹ {item.price}</span>

                    {item.oldPrice && (
                        <span className={styles.old}>
                            ₹ {item.oldPrice}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;