import { NavLink } from 'react-router-dom';

const active = ({ isActive }) => (isActive ? 'active' : '');
export const menu = [
    {
        label: (
            <NavLink exact to="/" className={active}>
                Home
            </NavLink>
        ),
        key: 'home',
        className: 'menu-item',
    },
    {
        label: (
            <NavLink to="/orders" className={active}>
                Orders
            </NavLink>
        ),
        key: 'orders',
        className: 'menu-item',
    },
    {
        label: (
            <NavLink to="/tables" className={active}>
                Tables
            </NavLink>
        ),
        key: 'tables',
        className: 'menu-item',
    },
    {
        label: (
            <NavLink to="/waiters" className={active}>
                Waiters
            </NavLink>
        ),
        key: 'waiters',
        className: 'menu-item',
    },
    {
        label: (
            <NavLink to="/dishes" className={active}>
                Dishes
            </NavLink>
        ),
        key: 'dishes',
        className: 'menu-item',
    },
];
