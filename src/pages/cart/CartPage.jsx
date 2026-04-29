import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQty } from "../../redux/addToCartSlice";

const CartPage = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items || []);

    const total = items.reduce(
        (sum, item) => sum + (Number(item.price) || 0) * item.qty,
        0
    );

    if (items.length === 0) {
        return (
            <div style={{ padding: "120px 40px", minHeight: "60vh" }}>
                <h2>Cart</h2>
                <p>Your cart is empty.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: "120px 40px", minHeight: "60vh" }}>
            <h2>Cart</h2>
            <div style={{ display: "grid", gap: "16px", marginTop: "24px" }}>
                {items.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "96px 1fr auto auto",
                            gap: "16px",
                            alignItems: "center",
                            border: "1px solid #eee",
                            borderRadius: "10px",
                            padding: "14px",
                        }}
                    >
                        <img
                            src={item.mainImage}
                            alt={item.title}
                            style={{
                                width: "96px",
                                height: "96px",
                                objectFit: "cover",
                                borderRadius: "8px",
                            }}
                        />
                        <div>
                            <h3 style={{ margin: "0 0 6px", fontSize: "18px" }}>{item.title}</h3>
                            <p style={{ margin: "0", color: "#b88e2f" }}>
                                ₹ {item.price} x {item.qty}
                            </p>
                        </div>
                        <input
                            type="number"
                            min="1"
                            value={item.qty}
                            onChange={(e) =>
                                dispatch(updateQty({ id: item.id, qty: Number(e.target.value) || 1 }))
                            }
                            style={{ width: "72px", padding: "8px" }}
                        />
                        <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "6px",
                                background: "#fff",
                                padding: "8px 10px",
                                cursor: "pointer",
                            }}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: "28px", textAlign: "right", fontSize: "20px" }}>
                <strong>Total: ₹ {total.toFixed(2)}</strong>
            </div>
        </div>
    );
};

export default CartPage;
