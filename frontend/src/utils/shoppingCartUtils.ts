import { ShoppingCartState } from "../types";

export const pricesInCart = (state: ShoppingCartState) => {
    const roundToTwoDecimals = (num: number) => parseFloat((Math.round(num * 100) / 100).toFixed(2));
  
    const priceExlTax = roundToTwoDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty/1.25, 0));
    const shippingCost = roundToTwoDecimals(priceExlTax > 30 ? 0 : 10);
    const taxAmount = roundToTwoDecimals(priceExlTax * 0.25);
    const totalPrice = roundToTwoDecimals(priceExlTax + shippingCost + taxAmount);
  
    Object.assign(state, { priceExlTax, shippingCost, taxAmount, totalPrice });
  
    localStorage.setItem("cart", JSON.stringify(state));
  
    return state;
}