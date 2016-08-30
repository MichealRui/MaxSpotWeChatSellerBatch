'use strict';

import React from 'react';
require('./index.css');
export default class BottomBar extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return(
			<div className='bottomBar'>
				<span className='font12'>总金额：<em className='font18'>{props.totalMoney || 0}</em><i>元</i></span>
				<span className="button settleButton font18">结算</span>
			</div>
		)
	}
}