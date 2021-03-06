'use strict';
import React from 'react';
import SubSelector from '../../components/ButtonSelector/ButtonSelector'
require ('./index.css');

export default class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selector:[],
            selectorKey:'all'
        }
    }

    setSubSelector(selector) {
        this.setState({
            selector: selector,
            selectorKey:selector.key
        });
        this.props.changeContent(selector.key, selector.subSelector[0])
    }

    componentWillReceiveProps(nextProps) {
        // Bad Hack
        if(this.state.selector.length == 0) {
            this.setState({
                selector: nextProps.selector[0]
            })
        }
    }

    render() {
        let props = this.props;
        let keys = props.selector;
        let tag = keys.map(
            (sel,index)=>{
                return (
                    <li key={index} className={ "selector " + (this.state.selectorKey == sel.key ? 'active' : '')  }
                        onClick={
                            () => this.setSubSelector(sel)
                        }
                    >
                        <div className={"imageScale " }>
                            <div className={"itemIcon font34 fa "}>
                                <img width='100%' src={sel.image}/>
                            </div>
                            <div className='itemName font24'>
                                <span>{sel.content}</span>
                            </div>
                        </div>
                    </li>
                )
            }
        )

        return (
            <div>
                <ul className="selectorContainer">
                    {tag}
                </ul>
                <SubSelector selector={this.state.selector}
                             changeContent={this.props.changeContent}
                             selectorKey={this.state.selectorKey}
                />
            </div>
        )
    }
}