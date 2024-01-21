export interface ShoppingCartState {
    cartItems: { price: number, qty: number }[]; 
    priceOfItems: number;
    shippingCost: number;
    taxAmount: number;
    finalPrice: number;
}

export const pricesInCart = (state: ShoppingCartState) => {
    const roundToTwoDecimals = (num: number) => Math.round(num * 100) / 100;

    const priceOfItems = state.cartItems.reduce((acc, item) => acc + roundToTwoDecimals(item.price * item.qty), 0);
    const shippingCost = priceOfItems > 30 ? 0 : 10;
    const taxAmount = roundToTwoDecimals(priceOfItems * 0.15);
    const finalPrice = priceOfItems + shippingCost + taxAmount;

    Object.assign(state, { priceOfItems, shippingCost, taxAmount, finalPrice });
    localStorage.setItem("cart", JSON.stringify(state));

    return state;
}