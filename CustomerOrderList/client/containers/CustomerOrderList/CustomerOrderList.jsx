'use static';

import React from 'react';
import CustomerOrder from '../../components/CustomerOrder/CustomerOrder';
import CustomerOrderData from './CustomerOrderData';
require('./index.css');
export default class CustomerOrderList extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let listArr = [];
		CustomerOrderData.forEach(function(order){
			listArr.push(<CustomerOrder order={order} />);
		});
		return(
			<ul className='customerOrderContainer'>
				{listArr}
			</ul>
		);
	}
}