'use strict';

import React from 'react';
import OrderItem from '../PaySuccOrderItem/PaySuccOrderItem'
export default class PaySuccessOrderList extends React.Component {
	constructor(props){
		super(props);
	}


	render(){
		let props = this.props;
		let subOrders = props.orderList.childOrders && props.orderList.childOrders.length > 0 ?
			props.orderList.childOrders.map((order,index)=>{
				return <OrderItem key={index} orderInfo = {order}/>
			}):'';
		return (
			<ul>
				{subOrders}
			</ul>
		);
	}
}
PaySuccessOrderList.PropTypes = {
	orderList : React.PropTypes.object
};
PaySuccessOrderList.defaultProps = {
	orderList:{
		childOrders:[]
	}
}