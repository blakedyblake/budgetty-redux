import axios from 'axios'

const initialState = {
    purchases:[],
    budgetLimit:null,
    loading:false
}
const REQUEST_BUDGET_DATA = "REQUEST_BUDGET_DATA"
const ADD_PURCHASE ="ADD_PURCHASE";
const REMOVEPURCHASE = "REMOVEPURCHASE"

export const requestBudgetData = ()=>{
    let data = axios.get('/api/budget-data').then(res=>res.data)
        return {
            type: REQUEST_BUDGET_DATA,
            payload:data
        }
}
export const addPurchase = (price, description,category)=>{
    let data = axios.post('/api/budget-data/purchase',{ description, price,category}).then(res=>res.data)
    return{
        type: ADD_PURCHASE,
        payload: data
    }
}
export const removePurchase = (id)=>{
    let data = axios.delete(`/api/budget-data/purchase/${id}`).then(res=>res.data)
    return {
        type:REMOVEPURCHASE,
        payload:data
    }
}
function reducer(state = initialState, action){
    switch(action.type){
        case REQUEST_BUDGET_DATA + '_PENDING':
            return {...state, loading:true}
        case REQUEST_BUDGET_DATA + '_FULFILLED':
            return {...state, ...action.payload, loading:false}
        case ADD_PURCHASE + '_PENDING':
            return {...state, loading:true}
        case ADD_PURCHASE + '_FULFILLED':
            return {...state, ...action.payload, loading:false}
        case REMOVEPURCHASE + '_PENDING':
            return {...state, loading:true}
        case REMOVEPURCHASE + '_FULFILLED':
            return {...state, loading:false, ...action.payload} //The end was different for some reason
        default:
            return state;
    }
    
}

export default reducer;