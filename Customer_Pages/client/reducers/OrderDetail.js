/**
 * Created by ruibing on 17/1/17.
 */
import * as actionTypes from '../actionTypes/common/OrderDetail'

function initStart(content) {
    return Object.assign({},content);
}

function initSuccess(content,store) {
    let newInfo = Object.assign({},content,store);
    if(newInfo.childOrders){
        newInfo.isChild = false;
    }else{
        newInfo.isChild = true;
    }
    return newInfo;
}

export default function(content={}, action) {
    switch (action.type) {
        case actionTypes.INIT_ORDERDETAIL_START:
            return initStart(content);
        case actionTypes.INIT_ORDERDETAIL_SUCCESS :
            return initSuccess(content, action.order);
        default:
            return content;
    }
}