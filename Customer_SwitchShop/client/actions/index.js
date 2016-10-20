/**
 * Created by wyf on 2016/10/19.
 */
import fetch from 'isomorphic-fetch';
import {INIT_START, INIT_SUCCESS, INIT_FAIL, SWITCH_SHOP_SUCCESS, SWITCH_SHOP_FAIL} from '../constants/ActionTypes';

export function initShopList() {
    return (dispatch)=>{
        dispatch(initStart());
        fetch('',{
            method:'POST',
            mode:'cors',
            Origin:'*'
        })
            .then(response=>response.json())
            .then(json=>{
                if(json.is_succ){
                    dispatch(initSuccess(json.shopList));
                }else {
                    dispatch(initFail());
                }
            })
            .catch((e)=>console.log(JSON.stringify(e)));
    };
}

export function initStart() {
    return {
        type:INIT_START
    };
}

export function initSuccess(content) {
    return {
        type:INIT_SUCCESS,
        content
    };
}


export function initFail() {
    return {
        type:INIT_FAIL
    };
}

export function switchShop(shop_id) {
    return (dispatch)=>{
        fetch('',{
            method:'POST',
            mode:'cors',
            Origin:'*',
            body:JSON.stringify({
                shopId:shop_id
            })
        })
            .then(response=>response.json())
            .then(json=>{
                if(json.is_succ){
                    dispatch(switchShopSuccess(json.shopName));
                }else {
                    dispatch(switchShopFail());
                }
            })
            .catch((e)=>console.log(JSON.stringify(e)));
    }
}

export function switchShopSuccess(shopName) {
    return {
        type:SWITCH_SHOP_SUCCESS,
        shopName
    };
}

export function switchShopFail() {
    return {
        type:SWITCH_SHOP_FAIL
    };
}
