import { createSelector } from 'reselect';

export const selectOrders = state => state.order.list;
export const selectWaiters = state => state.waiter.list;
export const selectTables = state => state.table.list;
export const selectMenuItems = state => state.menu.menuItems;

export const selectCommonOrders = createSelector(
    selectOrders,
    selectWaiters,
    selectTables,
    selectMenuItems,
    (orders, waiters, tables, menuItems) => {
        const waitersMap = waiters.reduce((acc, waiter) => {
            acc[waiter.id] = waiter;
            return acc;
        }, {});
        const tablesMap = tables.reduce((acc, table) => {
            acc[table.id] = table;
            return acc;
        }, {});

        if (!Array.isArray(orders)) {
            return [];
        }

        return orders.map(order => ({
            ...order,
            table: tablesMap[order.tableId],
            waiter: waitersMap[order.waiterId],
            menuItems: menuItems
        }));
    }
);
