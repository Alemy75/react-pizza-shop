import React from 'react';
import { useSelector } from 'react-redux';
import CartEmpty from '../components/HeaderCart/CartEmpty';
import HeaderCart from "../components/HeaderCart/HeaderCart";

const Cart = () => {
    const {items} = useSelector(state => state.cart)

    return (
        <>
            {items.length > 0 && <HeaderCart/>}
            {items.length === 0 && <CartEmpty/>}
        </>
    );
};

export default Cart;