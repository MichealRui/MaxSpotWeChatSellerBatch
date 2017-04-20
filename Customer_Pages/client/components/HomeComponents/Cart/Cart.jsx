'use strict';
import React, { Component } from 'react';
import Counter from '../../CommoonComponents/Counter/Counter';
import cart_img from './image/cart.png'
import {setAnimateFalse} from '../../../actions/Cart'
import {Link} from 'react-router'
require ('./index.css');

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartActive : '',
            cartTimer : 1000,
            cartLock : false
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.cart.count > this.props.cart.count && nextProps.cart.count && !this.state.cartLock){
            this.setState({
                cartActive:'active',
                cartLock : true
            });
            window.setTimeout( () => {
                this.setState({
                    cartActive:'',
                    cartLock : false
                })
            }, 1500)
        }

    }

    render() {
        let cart = this.props.cart;
        let clearCart = this.props.clearCart;
        return (
            <Link to="/shoppingCart">
                <div className={cart.remainTime?"bottomButton":"bottomButton empty" +' ' + this.state.cartActive}
                >
                    <div className='cartIcon '>
                        <div className='shopping_cart font30'>
                            <img src={cart_img} className="shopping-count-bg" alt="购物车"/>
                            <span className='count shopping-count font10'>{cart.count || 0}</span>
                        </div>
                    </div>
                    {
                        cart.remainTime ?
                        <Counter remainTime={cart.remainTime}
                                 timeUpCallback={clearCart}/> : null
                    }
                </div>
            </Link>
        );
    }
}

Cart.propTypes = {
    cart: React.PropTypes.object
};

Cart.defaultProps = {
    cart: {
        count:0
    }
};