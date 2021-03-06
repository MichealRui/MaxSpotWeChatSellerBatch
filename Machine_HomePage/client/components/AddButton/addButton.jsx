'use strict';
import React from 'react'
require('./index.css');

export default class AddButton extends React.Component {
    constructor(props) {
        super(props)
    }
    
    addClick() {
        // todo update cart
        console.log("add")
        let cart = this.props.cart;

        this.props.click(
            {
                storeId: this.props.store.id + '',
                skuId: this.props.item.id + '',
                count: '1'
            }
        )
    }
    
    render() {
        return (
            <span className="add font30" onClick={this.addClick.bind(this)}>+</span>
        )
    }
}