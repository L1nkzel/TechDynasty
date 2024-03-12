export interface ProductType {
    image: string;
    name: string;
    price: number;
    _id?: string;
    rating?: number;
    numReviews?: number;
    category: string;
    countInStock: number;
    description: string;
    brand: string;
  }

  export interface ShoppingCartState {
    cartItems: { price: number, qty: number }[]; 
    priceOfItems: number;
    shippingCost: number;
    taxAmount: number;
    totalPrice: number;
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxxs: true;
    xxs: true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}