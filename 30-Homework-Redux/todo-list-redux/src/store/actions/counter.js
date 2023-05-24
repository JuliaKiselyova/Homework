export const ACTION_COUNTER_INCREMENT = 'INCREMENT';
export const ACTION_COUNTER_DECREMENT = 'DECREMENT';

export const increment = () => ({
    type: ACTION_COUNTER_INCREMENT
});

export const decrement = () => ({
    type: ACTION_COUNTER_DECREMENT
});
