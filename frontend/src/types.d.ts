export interface Review {
  name: string;
  rating: number;
  comment: string;
  user: string; 
}


export interface ProductType {
  image: string;
  user ?: string;
  name: string;
  price: number;
  _id?: string;
  rating: number;
  numReviews?: number;
  category: string;
  countInStock: number;
  description: string;
  brand: string;
  reviews: Review[];
}

export interface ShoppingCartState {
  cartItems: { price: number, qty: number }[];
  priceOfItems: number;
  shippingCost: number;
  taxAmount: number;
  totalPrice: number;
}

export interface OrderType {
  id: string;
  user: string; 
  orderItems: {
    name: string;
    qty: number;
    image: string;
    price: number;
    product: string; 
  }[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentOptions: string;
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  priceOfItems: number;
  taxAmount: number;
  shippingCost: number;
  totalPrice: number;
  isPaymentCompleted: boolean;
  paymentDate?: Date;
  isDeliveryCompleted: boolean;
  deliveryDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
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