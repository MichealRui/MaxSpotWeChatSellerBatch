"ues strict";

import React from 'react';
import {connect} from 'react-redux';
import {initOrderDetail} from '../../actions/OrderDetail';
import OrderHeader from '../../components/OrderDetailComponents/OrderDetailHeader/OrderDetailHeader'
import OrderDetailStoreInfo from '../../components/OrderDetailComponents/OrderDetailStoreInfo/OrderDetailStoreInfo'
import OrderDetailOrderInfo from '../../components/OrderDetailComponents/OrderDetailOrderInfo/OrderDetailOrderInfo'
import OrderDetailProductList from '../../components/OrderDetailComponents/OrderDetailProductList/OrderDetailProductList'
class OrderDetailContainer extends React.Component {
    constructor(props){
        super(props);
        this._ordernumber = this.props.params.orderNumber;
    }

    componentWillMount(){
        const {dispatch} = this.props;
        dispatch(initOrderDetail(this._ordernumber))
    }

    render(){
        const {state,dispatch} = this.props;
        const {orderDetail} = state;
        return(
            <div className="orderDetailContainer">
                <OrderHeader orderInfo={orderDetail.order}/>
                <OrderDetailStoreInfo storeInfo = {orderDetail.order}/>
                <OrderDetailOrderInfo orderInfo = {orderDetail.order}/>
                <OrderDetailProductList orderInfo = {orderDetail.order}/>
            </div>
        )
    }
}

function select(store) {
    return Object.assign({},{state:store});
}

export default connect(select)(OrderDetailContainer)