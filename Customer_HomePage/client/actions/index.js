/**
 * Created by ruibing on 16/9/19.
 */

import fetch from 'isomorphic-fetch'

export const CHANGE_SUBCONTENT = 'CHANGE_SUBCONTENT';

export const INIT_START = 'INIT_START';

export const INIT_SUCCESS = 'INIT_SUCCESS';

export const INIT_FAIL = 'INIT_FAIL';

export const ADDTO_CART = 'ADDTO_CART';

export const CLEAR_CART = 'CLEAR_CART';

export const INIT_WX_CONFIG = 'INIT_WX_CONFIG';

export const INIT_WX_CONFIG_SUCC = 'INIT_WX_CONFIG_SUCC';

export const INIT_WX_CONFIG_ERR = 'INIT_WX_CONFIG_ERR';

export  const JSSDK_INITED = 'JS_SDK_INIT';

export function initWxConfig() {
    return (dispatch) => {
        dispatch(initWXStart());
        fetch('', // todo fetch wx config
            {
                method: 'POST',
                mode: 'cors',
                Origin: '*',
            }
        ).then(response => response.json())
            .then( json => {
                if(json.is_succ) {
                    dispatch(initWxConfigSucc(json.config))
                } else {
                    dispatch(initWxConfigErr( { errorMessage: json.error_message } ))
                }
            } ).catch(e => dispatch(initWxConfigErr( { errorMessage: '服务器错误' } )))
    }
}

export function initWxConfigSucc(config) {
    return {
        type: INIT_WX_CONFIG_SUCC,
        config
    }
}

export function initWxConfigErr() {
    return {
        type: INIT_WX_CONFIG_ERR
    }
}

export function initSdk() {
    return {
        type: JSSDK_INITED
    }
}

export function addToCart() {
    return (dispatch) => {
        dispatch(startAddToCart())
        fetch("",
            {
                method: 'POST',
                mode: 'cors',
                Origin: '*',
            })
            .then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(successAddToCart())
                } else {
                    dispatch(errorAddToCart({errorMessage: json.error_message}))
                }
            }).catch(e => dispatch(errorAddToCart({ errorMessage: '服务器错误' })))
    }
}

export function startAddToCart() {
    
}

export function successAddToCart() {
    
}

export function errorAddToCart() {
    
}

export function clearCart() {
    return {
        type: CLEAR_CART
    }
}

export function initSubContent() {
    
//     let bannerdata = [
//         {
//             destUrl: "http://www.baidu.com",
//             imagePath: "http://photos.cntraveler.com/2014/09/29/5429c32b425f183f61bf7316_new-york-city-skyline.jpg"
//         },
//         {
//             destUrl: "http://www.baidu.com",
//             imagePath: "https://ephemeralnewyork.files.wordpress.com/2010/08/broadway47thstreet2010.jpg"
//         },
//         {
//             destUrl: "http://www.baidu.com",
//             imagePath: "http://photos.cntraveler.com/2014/09/29/5429c32b425f183f61bf7316_new-york-city-skyline.jpg"
//         },
//         {
//             destUrl: "http://www.baidu.com",
//             imagePath: "https://ephemeralnewyork.files.wordpress.com/2010/08/broadway47thstreet2010.jpg"
//         }
//     ];
//
//     let selector = [
//     {key: 'food', content: '食品', faIcon:'fa-empire'},
//     {key: 'drink', content: '酒饮', faIcon:'fa-glass'},
//     {key: 'makeup', content: '美妆', faIcon:'fa-tint'},
//     {key: 'daily', content: '日用品', faIcon:'fa-umbrella'},
//     {key: 'baby', content: '母婴', faIcon:'fa-deviantart'}
// ];
//
//     let subContent =
//     {
//         'food':{
//             banner:{
//                 imgPath: 'http://photos.cntraveler.com/2014/09/29/5429c32b425f183f61bf7316_new-york-city-skyline.jpg',
//                 bannerDist: 'http://www.baidu.com'
//             },
//             freeItems: [
//                 {}, {}, {}
//             ],
//             items: [
//                 {},
//                 {},
//                 {},
//                 {},
//                 {}
//                 ]
//         },
//
//         'all':{
//             banner:{
//                 imgPath: 'http://photos.cntraveler.com/2014/09/29/5429c32b425f183f61bf7316_new-york-city-skyline.jpg',
//                 bannerDist: 'http://www.baidu.com'
//             },
//             freeItems: [
//                 {}, {}, {}
//             ],
//             items: [
//                 {},
//                 {},
//                 {}
//             ]
//         }
//     };
//
//     let shoppingCart = {
//         remainTime: '380',
//         count: 5
//     };
//
//     let data = {
//         banner: bannerdata,
//         selector: selector,
//         subContent: subContent,
//         cart: shoppingCart
//     };
//
//     return (dispatch) => {
//         dispatch(initSuccess(data))
//     };
    return (dispatch) =>  {
        dispatch(initStart());
        fetch( 'http://www.mjitech.com/web/buyer_api/get_mainpage_data.action',
            {
                method: 'POST',
                mode: 'cors',
                Origin: '*',
                body: JSON.stringify(
                    Object.assign({}, {"storeId": "7"})
                )
            }
        ).then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(initSuccess({
                        banner: json.banners,
                        content: json.categories
                    }))
                } else {
                    dispatch(initFail())
                }
            }).catch(e => dispatch(initFail()))
    }
}

export function initStart() {
    return {
        type: INIT_START
    }
}

export function initSuccess(content) {
    return {
        type: INIT_SUCCESS,
        content
    }
}

export function initFail() {
    return {
        type: INIT_FAIL
    }
}

export function changeSubContent(key) {
    return {
        type: CHANGE_SUBCONTENT,
        key
    }
}