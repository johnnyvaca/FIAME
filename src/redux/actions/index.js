import {GET_SALES, SELECTED_SALE} from "./actionsTypes";

export const addSales = (data) => ({
    type: GET_SALES,
    payload: {
        data
    }
})

export const selectedSale = (data) => ({
    type: SELECTED_SALE,
    payload: {
        data
    }
})
