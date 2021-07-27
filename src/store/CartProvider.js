import React, {useReducer} from 'react';

import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};


const cartReducer = (state, action) => {

    switch(action.type) {
        case 'ADD':
            const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
            const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);

            const existingItem = state.items[existingItemIndex];
            let updatedItems;

            if (existingItem) {
                const updatedItem = {
                    ...existingItem,
                    amount: existingItem.amount + action.item.amount
                };
                updatedItems = [...state.items];
                updatedItems[existingItemIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.item);
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            };
        case 'REMOVE':
            
            const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);

            const existingCartItem = state.items[existingCartItemIndex];
            const updatedAmount = state.totalAmount - existingCartItem.price;
            let updatedCartItems;
            if (existingCartItem.amount === 1) {
                updatedCartItems = state.items.filter(item => item.id !== action.id);
            } else {
                const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1};
                updatedCartItems = [...state.items];
                updatedCartItems[existingCartItemIndex] = updatedItem;
            }
            
            return {
                items: updatedCartItems,
                totalAmount: updatedAmount,
            };

        default: return defaultCartState;
    }

};


const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item});
    };

    const removeItemHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id: id});
    };


    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemHandler,
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;
