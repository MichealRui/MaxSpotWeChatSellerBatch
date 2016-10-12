/**
 * Created by ruibing on 16/10/11.
 */
import fetch from 'isomorphic-fetch'

export const INIT_START = 'INIT_START';

export const INIT_SUCCESS = 'INIT_SUCCESS';

export const INIT_FAIL = 'INIT_FAIL';

export function initPageContent() {
    // return (dispatch) => {
    //     dispatch(initStart())
    //     fetch( '',
    //         {
    //             method: 'POST',
    //             mode: 'cors',
    //             Origin: '*',
    //         }
    //     ).then(response => response.json())
    //         .then(json => {
    //             if(json.is_succ) {
    //                 dispatch(initSuccess(json.data))
    //             } else {
    //                 dispatch(initFail())
    //             }
    //         })
    // }

    return {
        remainTime:'14分58秒',
        productItems:[
            {
                orderAddress:'北京地铁一号线国贸站机器A',
                orderDetailProductList:[
                    {
                        productImg:'./mycomponent/productItemImg.png',
                        productName:'Gokuri',
                        productDesc:'桃味果汁饮料500ml',
                        productTaste:'番茄口味',
                        unitPrice:'20',
                        quantity:'1',
                        amount:'20'
                    },
                    {
                        productImg:'./mycomponent/productItemImg.png',
                        productName:'Gokuri',
                        productDesc:'桃味果汁饮料500ml',
                        productTaste:'番茄口味',
                        unitPrice:'20',
                        quantity:'1',
                        amount:'20'
                    }
                ],
                discount:0,
                totalCount:2,
                totalMoney:90
            },
            {
                orderAddress:'北京地铁一号线国贸站机器B',
                orderDetailProductList:[
                    {
                        productImg:'./mycomponent/productItemImg.png',
                        productName:'Gokuri',
                        productDesc:'桃味果汁饮料500ml',
                        productTaste:'番茄口味',
                        unitPrice:'20',
                        quantity:'1',
                        amount:'20'
                    }
                ],
                discount:-15,
                totalCount:2,
                totalMoney:90
            }
        ],
        actualMoney:200,
        productDiscount:-18,
        totalDiscount:-10,
        totalMoney:172
    }
}

export function initStart() {
    return {
        type: INIT_START
    }
}

export function initSuccess() {
    return {
        type: INIT_SUCCESS
    }
}

export function initFail() {
    return {
        type: INIT_FAIL
    }
}