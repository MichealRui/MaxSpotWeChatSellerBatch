'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Button from '../../components/Button/Button';
import OrderDetailTitle from '../../components/OrderDetailTitle/OrderDetailTitle';
import OrderDetailProductList from '../../components/OrderDetailProductList/OrderDetailProductList';
import Util from '../../util/WeChatUtil'
import * as Actions from '../../actions/index';
require('./index.css');

class OrderDetail extends React.Component {
	constructor(props){
		super(props);
	}

	componentWillMount(){
	    const {actions} = this.props;
        let orderNumber=Util.getUrlParam().ordernumber;
        actions.initStart();
        actions.initOrderDetail(orderNumber);
    }

    payNow(orderNumber) {
        window.location.href =
            ENV.domain + '/buyer_confirm/wxpay/index.html?ordernumber='+orderNumber
    }

    takeGood(orderNumber) {
        window.location.href=
            ENV.domain + '/buyer_takegoods/index.html?ordernumber=' + orderNumber
	}

	render(){
		let {orderDetail, actions} = this.props;
        let newOrder = orderDetail.childOrders && orderDetail.childOrders.length > 0 ? Object.assign({},orderDetail.childOrders[0]) : Object.assign({},orderDetail);
        let orderNumber = newOrder.orderNumber;
        let buttonArea;
        switch (newOrder.status) {
            case 1 :
                buttonArea= (
                    <div className="buttonArea clearfix">
                        <span className='font14'>订单还未支付哦</span>
                        <Button buttonClassName='pickUpButton'
                                buttonClick={()=>this.payNow(orderNumber)}
                                buttonText='立即支付'/>
                    </div>
                );
                break;
            case 2 :
                buttonArea = (
                    <div className="buttonArea clearfix">
                        <span className='font14'>取货时请记得确认位置哦</span>
                        <Button buttonClassName='pickUpButton'
                                buttonClick={()=>this.takeGood(orderNumber)}
                                buttonText='立即取货'/>
                    </div>
                );
                break;
            case 3 :
                buttonArea = (
                    <div className="buttonArea clearfix">
                        <span className='font14'>取货时请记得确认位置哦</span>
                        <Button buttonClassName='pickUpButton'
                                buttonClick={()=>this.takeGood(orderNumber)}
                                buttonText='立即取货'/>
                    </div>
                );
                break;
            case 4:
                buttonArea = (
                    <div className="buttonArea clearfix">
                        <span className='font14'>正在取货中</span>
                        <Button buttonClassName='pickUpButton' disabled buttonText='正在取货'/>
                    </div>
                );
                break;
            case 5:
                buttonArea = (
                    <div className="buttonArea clearfix">
                        <span className='font14'>完成取货</span>
                        <Button buttonClassName='pickUpButton' disabled buttonText='完成取货'/>
                    </div>
                );
                break;
            case 91:
                buttonArea = (
                    <div className="buttonArea clearfix">
                        <span className='font14'>订单已取消</span>
                        <Button buttonClassName='pickUpButton' disabled buttonText='订单已取消'/>
                    </div>
                );
                break;

        }
		return(
		    <div>
                {
                    newOrder.store ? (
                        <div className='orderDetailContainer'>
                            {buttonArea}
                            <OrderDetailTitle orderTitleIcon={'fa-th-large'} orderTitleText={newOrder.store.name}/>
                            <OrderDetailTitle orderTitleIcon={'fa-map-marker'} orderTitleText={newOrder.store.address}/>
                            <div className='timeAndMobile'>
                                <div className='orderTime'>
                                    <span className="fa font20 fa-clock-o"></span>
                                    <span className="time font14">08:00 - 23:00</span>
                                </div>
                                <div className='orderMobile'>
                                    <span className="fa font20 fa-phone"></span>
                                    <span className="mobile font14">{newOrder.store.phone}</span>
                                </div>
                            </div>
                            <div className='orderDetailNumber orderDetailInfo font14'>
                                <span>订单编号</span>
                                <span className='orderNumber'>{newOrder.orderNumber}</span>
                                <span className='orderStatus'>{newOrder.statusName}</span>
                            </div>
                            <div className='orderDetailDate orderDetailInfo font14'>
                                <span>交易时间</span>
                                <span className='last'>{newOrder.sellTime}</span>
                            </div>
                            {/*<div className='orderDetailLastDate orderDetailInfo font14'>*/}
                                {/*<span>最晚提货时间</span>*/}
                                {/*<span className='last'>{orderDetail.orderLastDate}</span>*/}
                            {/*</div>*/}
                            {
                                newOrder.takeGoodsNumber ?
                                    (
                                        <div className='orderCode orderDetailInfo font14'>
                                            <span>取货码</span>
                                            <span className='code last'>{newOrder.takeGoodsNumber}</span>
                                        </div>
                                    ) : ''
                            }

                            <OrderDetailProductList
                                orderDetailProductList={newOrder.skus}
                                totalMoney={newOrder.totalPrice || 0}
                                campaigns={newOrder.promotions}
                                {...newOrder}
                            />
                        </div>
                    ) : ''

                }
            </div>
		);
	}
}

function mapStateToProps(state){
	return {
        orderDetail:state
	};
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);