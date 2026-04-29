// export const getCart = () => {
//     const data = localStorage.getItem("cart");
//     return data ? JSON.parse(data) : [];
// };

// export const setCart = (cart) => {
//     localStorage.setItem("cart", JSON.stringify(cart));
// };

// export const addToCart = (product) => {
//     let cart = getCart();

//     const existing = cart.find((item) => item.id === product.id);

//     if (existing) {
//         cart = cart.map((item) =>
//             item.id === product.id
//                 ? { ...item, qty: item.qty + 1 }
//                 : item
//         );
//     } else {
//         cart.push({
//             id: product.id,
//             title: product.title,
//             price: product.price,
//             mainImage: product.mainImage,
//             qty: 1
//         });
//     }

//     setCart(cart);

//     // 🔥 TRIGGER NAVBAR UPDATE
//     window.dispatchEvent(new Event("cartUpdated"));
// };