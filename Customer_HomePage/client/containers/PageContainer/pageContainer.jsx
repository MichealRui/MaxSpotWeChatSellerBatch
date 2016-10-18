'use strict';
import React from 'react'
import { connect }  from 'react-redux';
import wx from 'weixin-js-sdk';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import BottomButton from '../../components/BottomButton/BottomButton';
import BannerContainer from '../BannerContainer/bannerContainer';
import SelectContainer from '../SelectorContainer/selectorContainer';
import SubContent from '../SubContent/subContent'
import { initWxConfig, initSdk } from '../../actions/index'
import { initSubContent, initStart, changeSubContent } from '../../actions/index'
import { startAddToCart, clearCart } from '../../actions/index'

class PageContainer extends React.Component {
    constructor(props) {
        super (props)
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(initWxConfig());
    }

    componentDidUpdate() {
        const { dispatch } = this.props;
        let props = this.props.state;
        let config = props.wxConfig;
        let appId = 'wx4da5ecd6305e620a';
        if(config.signature && !props.sdkInited) {
            wx.config({
                debug: false,
                appId: appId,
                timestamp: config.timeStamp,
                nonceStr: config.nonceStr,
                signature: config.signature,
                jsApiList: ["getLocation"]
            });
            dispatch(initSdk())

            // init page
            wx.ready(function(){
                wx.getLocation({  // wx api
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                        let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        let speed = res.speed; // 速度，以米/每秒计
                        let accuracy = res.accuracy; // 位置精度
                        let geo = {
                            latitude,
                            longitude,
                            speed,
                            accuracy
                        };
                        dispatch(initStart());
                        dispatch(initSubContent({ geo }));
                    },
                    fail: function (res) {
                        // todo show shop selector and send shop id
                    },
                    cancel: function (res) {
                        // todo show shop selector and send shop id
                    }
                });
            });
        }

    }
    
    render() {
        let props = this.props.state;
        console.log(props);
        const { dispatch } = this.props;
        return (
            <div>
                <HomeHeader />
                <BannerContainer bannerData={props.banner}/>
                <SelectContainer selectorData={props.selector}
                                 onSelectClick={ key => dispatch(changeSubContent(key))}/>
                <SubContent contentData={props.currentSub} />
                <BottomButton cart={props.cart}
                              addToCart={(item) => dispatch(startAddToCart(item))}
                              clearCart={() => dispatch(clearCart())}/>
            </div>
        )
    }
}

function select(store) {
    console.log('dispatched')
    return Object.assign({}, {state: store})
}

export default connect(select)(PageContainer)