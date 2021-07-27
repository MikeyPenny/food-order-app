import React, {useRef, useState} from 'react';
import Input from '../../UI/Input';

import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {

    const [isAmountValid, setIsAmountValid] = useState(true);
    const amountInputRef = useRef();

    const submiHandler = (ev) => {
        ev.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const amountNumber = +enteredAmount;

        if (enteredAmount.trim().length === 0 || enteredAmount < 1 || enteredAmount > 5) {
            setIsAmountValid(false);
            return;
        }

        props.onAddToCart(amountNumber);

    };

    return (
        <form onSubmit={submiHandler} className={classes.form}>
            <Input
                ref={amountInputRef} 
                label="Amount" 
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }} 
            />
            <button>+ Add</button>
            {!isAmountValid && <p>Please enter a valid amount (1-5).</p> }
        </form>
    );
}

export default MealItemForm;
