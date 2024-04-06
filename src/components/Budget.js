import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, dispatch, expenses,currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);
    const handleBudgetChange = (event) => {
        if (event.target.value < totalExpenses) {
            setNewBudget(totalExpenses)
            alert("You cannot reduce the budget value lower than the spending");
        } else if (event.target.value > 20000) {
            setNewBudget(20000)
            alert(`The value cannot exceed remaining funds ${currency}20,000`);
        } else {
            setNewBudget(event.target.value);
        }
    }
    useEffect(() => {
        dispatch({ type: 'SET_BUDGET', payload: newBudget });
    }, [newBudget])
    return (
        <div className='alert alert-secondary'>
            {<span>Budget: {currency}</span>}
            <input type="number" step="10" value={newBudget} onChange={handleBudgetChange}></input>
        </div>
    );
};
export default Budget;