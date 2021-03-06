import * as actionTypes from '../actionTypes/ConfirmOrder';

function initStart(content) {
    return Object.assign({},content);
}

function initSuccess(content,data) {
    console.log('success');
    console.log(data);
    return Object.assign({},content,{orderInfo:data},{is_succ:true});
}

export default function (content={},action) {
    switch (action.type){
        case actionTypes.INIT_CONFIRM_ORDER_START:
            return initStart(content);
        case actionTypes.INIT_CONFIRM_ORDER_SUCCESS:
            return initSuccess(content,action.content);
        default:
            return content;
    }
}