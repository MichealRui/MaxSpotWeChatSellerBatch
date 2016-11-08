'use strict';
import React from 'react';
require ('./index.css');

export default class Selector extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let props = [
            {1: {key: 'food', content: '食品', faIcon:'fa-empire'},
            2: {key: 'makeup', content: '美妆', faIcon:'fa-tint'},
            3: {key: 'daily', content: '日用品', faIcon:'fa-umbrella'},
            4: {key: 'drink', content: '酒饮', faIcon:'fa-glass'},
            5: {key: 'baby', content: '母婴', faIcon:'fa-deviantart'}}
        ];//this.props.data;

        return (
            <ul className="selectorContainer">
                {/*<li className={ "selector"+ " J_" + props.key }*/}
                    {/*onClick={() => this.props.onclick(props.key)}>*/}
                    {/*<div className={"itemIcon font34 fa " +props.faIcon}></div>*/}
                    {/*<div className='itemName font24'>{props.content}</div>*/}
                {/*</li>*/}
                <li className={ "selector" }>
                    <div className={"itemIcon font34 fa "}></div>
                    <div className='itemName font24'>
                        <img src={require('./images/icon_1.png')}/>
                        <span>美食</span>
                    </div>
                </li>
                <li className={ "selector" }>
                    <div className={"itemIcon font34 fa "}></div>
                    <div className='itemName font24'>美妆</div>
                </li>
            </ul>
        )
    }
}