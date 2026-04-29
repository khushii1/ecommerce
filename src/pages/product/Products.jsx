import styles from "./products.module.css";
import ProductCard from "../../components/product/ProductCard";
import { useSelector } from "react-redux";








const Products = () => {
    const productSelector = useSelector((state) => state.product.products || []);



    return (
        <section className={styles.section}>
            <h2>Our Products</h2>

            <div className={styles.grid}>
                {productSelector.length === 0 ? (
                    <p>No products found</p>
                ) : (
                    productSelector.map((item) => (
                        <ProductCard key={item.id} item={item} />
                    ))
                )}
            </div>

            <button className={styles.showMore}>Show More</button>
        </section>
    );
};

export default Products;


