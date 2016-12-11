import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')

export default class CartItem extends React.Component{
    constructor(props) {
        super(props)
    }

    getMiddlePic(path) {
        let particial = path.split('.');
        if(particial.length == 2) {
            particial[0] = particial[0] + '_middle';
            return particial.join('.')
        } else {
            return path
        }
    }

    removeItem() {
        this.props.remove(this.props.item)
    }

    decrease() {
        this.props.dec(
            this.props.item
        )
    }

    addItem() {
        this.props.add(
            this.props.item
        )
    }

    getAtts(attributes){
        let def = <span></span>
        var atts = def;
        if(attributes && attributes.length > 0){
            atts = attributes.map((item,index)=>{
                if(item.value){
                    return item.value + item.unit;
                }else{
                    return ''
                }
            }).reduce((pre,next)=>{
                if(pre == '' && next == ''){
                    return ''
                }else{
                    return pre + next + ' '
                }
            },'')
        }
        if(atts == ''){
            atts = def
        }
        return atts;
    }

    render() {
        let props = this.props.item;
        // console.log(props)
        var atts = this.getAtts(props.attributes)
        console.log(atts)
        return (
            <div className="cart-item my-item">
                <div className="item-pic">
                    <img src={'http://114.215.143.97' + this.getMiddlePic(props.imagePath)} alt="Product name" />
                </div>
                <h2 className="item-name">
                    <span>{props.brandName}</span>
                    <span>{props.shortName}</span>
                    <span className=' categoryName font18'>
                        {atts}
                    </span>
                </h2>
                <h3 className="item-price">
                    <span className="final-price">{props.sellprice /100 || 0}<span className="font20">元</span></span>
                    <span className="market-price font20 hide">市场价¥126</span>
                </h3>
                <div className="item-panel clearfix">
                    <div className={"counting undershop font20 hide"}>此商品已售罄</div>
                    <div className={"counting clearfix "}>
                        <a className="btn-minus" disabled={props.count == 1} onClick={() => this.decrease.bind(this)()}>-</a>
                        <span type="text" className="quantity" value={props.count} readOnly="readOnly">{props.count}</span>
                        <a className="btn-plus" disabled={ props.quantity <= props.count} onClick={() => this.addItem.bind(this)()}>+</a>
                    </div>
                    <a className="trash" onClick={() => this.removeItem.bind(this)()}>Remove this item!</a>
                </div>
                <div className="layer hide">
                    <div className="dialog">
                        <div className="font26 del">删除此商品？</div>
                        <div className="btn clearfix">
                            <div className="btn_yes font30">确定</div>
                            <div className="btn_no font30">取消</div>
                        </div>
                    </div>
                </div>
                <div className="layer hide"></div>
            </div>
        )
    }
}
