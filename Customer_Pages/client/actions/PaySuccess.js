import fetch from 'isomorphic-fetch';
import * as actionTypes from '../actionTypes/PaySuccess';
import * as messageAction from '../actions/Message'
const domain = ENV.domain;
export function InitPaySuccess(orderNumber) {
    return (dispatch) => {
        dispatch(initStart());
        fetch(domain + '/web/buyer_api/order_detail.ction',{
            credentials : 'include',
            method : 'POST',
            mode : 'cors',
            body : JSON.stringify({order_number:orderNumber})
        }).then(response => response.json())
            .then(json => {
                if(json.is_succ){
                    dispatch(initSuccess({order:json.order}));
                    //cb(json.order);
                }else{
                    dispatch(messageAction.setMessage({errorMessage:json.error_message}))
                }
            }).catch(e=>{
            dispatch(messageAction.setMessage({errorMessage:'服务器错误'}))
        })
    }
}


function initStart() {
    return {
        type: actionTypes.INIT_PAYSUCCESS_START
    }
}

function initSuccess(order) {
    return {
        type: actionTypes.INIT_PAYSUCCESS_SUCCESS,
        order
    }
}