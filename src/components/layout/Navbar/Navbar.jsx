import styles from './Navbar.module.css';
import logo from '../../../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsPerson } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { IoClose, IoHeartOutline, IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../../redux/addToCartSlice';
import { useEffect, useMemo, useState } from 'react';
import { logoutUser } from '../../../api/auth.api';
import { getData, removeData } from '../../../utils/localStorage';


const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartSelector = useSelector((state) => state.cart.items || []);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [authUser, setAuthUser] = useState(() => getData("authUser"));
    const count = cartSelector.reduce((sum, item) => sum + item.qty, 0);
    const total = useMemo(
        () => cartSelector.reduce((sum, item) => sum + (Number(item.price) || 0) * item.qty, 0),
        [cartSelector]
    );
    const initial = (authUser?.name || authUser?.email || "U").charAt(0).toUpperCase();

    useEffect(() => {
        if (!isCartOpen) return;
        const onEscape = (event) => {
            if (event.key === "Escape") setIsCartOpen(false);
        };
        window.addEventListener("keydown", onEscape);
        return () => window.removeEventListener("keydown", onEscape);
    }, [isCartOpen]);

    useEffect(() => {
        const syncUser = () => setAuthUser(getData("authUser"));
        window.addEventListener("storage", syncUser);
        window.addEventListener("focus", syncUser);
        return () => {
            window.removeEventListener("storage", syncUser);
            window.removeEventListener("focus", syncUser);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (_error) {
            // Clear client auth even if backend logout fails.
        } finally {
            removeData("authToken");
            removeData("authUser");
            setAuthUser(null);
            setIsProfileMenuOpen(false);
            navigate("/login", { replace: true });
        }
    };

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
                    {authUser ? (
                        <div className={styles.profileWrap}>
                            <button
                                type="button"
                                className={styles.profileBtn}
                                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                                aria-label="Open profile menu"
                            >
                                {initial}
                            </button>
                            {isProfileMenuOpen ? (
                                <div className={styles.profileMenu}>
                                    <p className={styles.profileName}>{authUser.name || authUser.email}</p>
                                    <button type="button" onClick={handleLogout} className={styles.logoutBtn}>
                                        Logout
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    ) : (
                        <NavLink to="/login"><BsPerson /></NavLink>
                    )}
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