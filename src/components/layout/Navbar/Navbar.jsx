import styles from './Navbar.module.css';
import logo from '../../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { BsPerson } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { IoClose, IoHeartOutline, IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../../redux/addToCartSlice';
import { useEffect, useMemo, useState } from 'react';


const Navbar = () => {
    const dispatch = useDispatch();
    const cartSelector = useSelector((state) => state.cart.items || []);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const count = cartSelector.reduce((sum, item) => sum + item.qty, 0);
    const total = useMemo(
        () => cartSelector.reduce((sum, item) => sum + (Number(item.price) || 0) * item.qty, 0),
        [cartSelector]
    );

    useEffect(() => {
        if (!isCartOpen) return;
        const onEscape = (event) => {
            if (event.key === "Escape") setIsCartOpen(false);
        };
        window.addEventListener("keydown", onEscape);
        return () => window.removeEventListener("keydown", onEscape);
    }, [isCartOpen]);


    return (
        <>
            <div className={styles.nav}>
                <div className={styles.logo}>
                    <img src={logo} alt="" />
                    <h2>Furniro</h2>
                </div>

                <ul className={styles.section}>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/shop">Shop</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>

                <div className={styles.icons}>
                    <NavLink to="#"><BsPerson /></NavLink>
                    <NavLink to="#"><IoIosSearch /></NavLink>
                    <NavLink to="#"><IoHeartOutline /></NavLink>

                    <button
                        type="button"
                        className={styles.cartBtn}
                        onClick={() => setIsCartOpen(true)}
                        aria-label="Open cart"
                    >
                        <span className={styles.cart}>
                            <IoCartOutline />
                            <span className={styles.count}>{count}</span>
                        </span>
                    </button>
                </div>
            </div>

            {isCartOpen && (
                <>
                    <div className={styles.backdrop} onClick={() => setIsCartOpen(false)} />
                    <aside className={styles.cartDialog}>
                        <div className={styles.dialogHeader}>
                            <h3>Shopping Cart</h3>
                            <button
                                type="button"
                                className={styles.closeBtn}
                                onClick={() => setIsCartOpen(false)}
                                aria-label="Close cart"
                            >
                                <IoClose />
                            </button>
                        </div>

                        <div className={styles.dialogBody}>
                            {cartSelector.length === 0 ? (
                                <p className={styles.emptyText}>Your cart is empty.</p>
                            ) : (
                                cartSelector.map((item) => (
                                    <div key={item.id} className={styles.cartItem}>
                                        <img src={item.mainImage} alt={item.title} />
                                        <div className={styles.cartItemInfo}>
                                            <p>{item.title}</p>
                                            <small>{item.qty} x ₹{item.price}</small>
                                        </div>
                                        <button
                                            type="button"
                                            className={styles.removeBtn}
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            aria-label={`Remove ${item.title}`}
                                        >
                                            <IoClose />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className={styles.dialogFooter}>
                            <div className={styles.subtotal}>
                                <span>Subtotal</span>
                                <strong>₹ {total.toFixed(2)}</strong>
                            </div>

                            <div className={styles.footerActions}>
                                <NavLink to="/cart" onClick={() => setIsCartOpen(false)}>Cart</NavLink>
                            </div>
                        </div>
                    </aside>
                </>
            )}
        </>
    );
};

export default Navbar;