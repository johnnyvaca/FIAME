import {GET_SALES,SELECTED_SALE} from "../actions/actionsTypes";
const initialState = {
    list: [],
    selectedSale: {}
}

export const sales = (state = initialState, action) => {
    switch (action.type){
        case GET_SALES:
            return {
                list:[...state.list, ...action.payload.data],
                selectedSale: state.selectedSale
            }
        case SELECTED_SALE:
            return {
                list:state.list,
                selectedSale: action.payload.data
            }
        default:
            return state
    }
}
