import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
	const [isHighlighted, setIsHighlighted] = useState(false);
	const cartCtx = useContext(CartContext);
	const { items } = cartCtx;

	const numberOfCartItems = items.reduce((currentNum, item) => {
		return currentNum + item.amount;
	}, 0);

	const btnClasses = `${classes.button} ${
		isHighlighted ? classes.bump : null
	}`;

	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setIsHighlighted(true);

		const animateTimer = setTimeout(() => {
			setIsHighlighted(false);
		}, 300);

		return () => {
			clearTimeout(animateTimer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
