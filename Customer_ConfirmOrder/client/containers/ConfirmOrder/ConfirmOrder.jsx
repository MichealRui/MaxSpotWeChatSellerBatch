'use strict';

import React from 'react'
import { connect }  from 'react-redux';
import Button from '../../components/Button/Button';
import AccountDisplay from '../../components/AccountDisplay/AccountDisplay';
import TotalProducts from '../TotalProducts/TotalProducts';
import { initPageContent, initSdk, initWXConfig} from '../../actions/index';
import Util from '../../util/WeChatUtil'
const wx = require('weixin-js-sdk');
require('./index.css');

class ConfirmOrder extends React.Component {
	constructor(props){
		super(props);
	}

    componentWillMount() {
        //init page content
        const { dispatch } = this.props;
        dispatch(initWXConfig());
	}

    componentDidUpdate() {
        const { dispatch } = this.props;
        let props = this.props.state;
        let config = props.authConfig;
        if(config.sign && !props.sdkInited) {
            if(this.initWx(config)) {
                dispatch(initSdk());
            }
        }
    }

    initWx(config) {
        let appId = 'wx4da5ecd6305e620a';
        try {
            wx.config({
                debug: false,
                appId: appId,
                timestamp: config.timestamp,
                nonceStr: config.noncestr,
                signature: config.sign,
                jsApiList: ["chooseWXPay"]
            });
            return true;
        } catch (e) {
            return false
        }

    }

    payOrder() {
        let config = this.props.state.wxConfig;
        let appId = 'wx4da5ecd6305e620a';
        wx.ready(function(){
            wx.chooseWXPay({
                appId: appId,
                timestamp: config.timeStamp,
                nonceStr: config.nonceStr,
                package: config.package,
                signType: "MD5",
                paySign: config.paySign,
                success: function(r){
                    let order = Util.getUrlParam().ordernumber;
                    window.location.href =
                        ENV.domain + '/buyer_paysucc/index.html?ordernumber=' + order
                },
                fail: function(r){
                    window.location.href =
                        ENV.domain + '/buyer_orderlist/index.html'
                },
                cancel: function(r){
                    //todo
                    console.log(r);
                    console.log('cancel')
                }
            });
        });
        return false;
    }

	render(){
        let props = this.props.state.orderInfo;
        let productItems = props.childOrders.map(
            (productItem, index) =>
                <TotalProducts key={index}
                               productItem={productItem}
                               store={productItem.store}
                               promotions={productItem.promotions}
                />
        );
        return(
            <div className='orderDetailContainer'>
                {
                    this.props.state.is_succ? (
                        <div>
                            {/*<div className="buttonArea clearfix">*/}
                                {/*<span className='font14'>剩余支付时间： {props.remainTime}</span>*/}
                                {/*</div>*/}
                            {productItems}
                            <div className="totalArea">
                            <AccountDisplay name='商品总金额' money={props.originalPrice / 100}/>
                            <AccountDisplay name='商品优惠总计' money={(props.originalPrice - props.totalPrice)/100}/>
                            </div>
                            <div className='font14 totalMoney'>
                                <AccountDisplay name='应付总金额' money={props.totalPrice/100 || 0}/>
                            </div>
                            <Button buttonClassName={'weiXinPay'}
                                    buttonText={'微信支付'+ (props.totalPrice/100 || 0)+'元'}
                                    buttonClick={this.payOrder.bind(this)}
                                    disabled={!this.props.state.sdkInited}
                            />
                        </div>
                    ) : ''
                }
            </div>
        );
    }
}

function select(store) {
	console.log('dispatched')
	return Object.assign({}, {state: store})
}

export default connect(select)(ConfirmOrder)