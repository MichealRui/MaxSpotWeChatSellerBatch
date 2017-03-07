'use strict';
import React from 'react'
import { connect }  from 'react-redux';
import wx from 'weixin-js-sdk';
import HomeHeader from '../../components/HomeComponents/Header/Header';
import BottomButton from '../../components/HomeComponents/Cart/Cart';
import BannerContainer from '../../components/HomeComponents/BannerContainer/bannerContainer';
import SelectContainer from '../../components/HomeComponents/SelectorContainer/selectorContainer';
import SubContent from '../../components/HomeComponents/SubContent/subContent'
import Message from '../../components/CommoonComponents/Message/Message';
import { initWxConfig, initSdk } from '../../actions/WeiXin'
import { changeSubContent, locationSucc, locationFail, initByStoreId } from '../../actions/Home'
import { clearCart, addToCart, initCart } from '../../actions/Cart'
import { setMessage } from '../../actions/Message'
import util from '../../util/WeChatUtil'

class PageContainer extends React.Component {
    constructor(props) {
        super (props);
        this._storeId = this.props.params.storeId || util.getUrlParam().storeid;
    }

    componentWillMount() {
        const { dispatch } = this.props;
        this._storeId ? dispatch(initByStoreId(this._storeId)) : dispatch(initWxConfig(window.location.href, initCart));
    }

    componentDidUpdate() {
        if(this._storeId) {
            return false
        } else {
            const { dispatch, state } = this.props;
            let config = state.weixin.wxConfig;
            if(config.sign && !state.weixin.sdkInited) {
                if(this.initWx(config)) {
                    dispatch(initSdk());
                    this.getGeo();
                }
            }
        }
    }

    initWx(config) {
        let appId = 'wx4da5ecd6305e620a';
        try {
            wx.config({
                debug: false,
                appId: appId,
                timestamp: config.timestamp,
                nonceStr: config.noncestr,
                signature: config.sign,
                jsApiList: ["getLocation","chooseWXPay"]
            });
            return true;
        } catch (e) {
            return false
        }
    }

    getGeo() {
        var geo;
        const { dispatch } = this.props;
        wx.ready(function(){
            wx.getLocation({  // wx api
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    let speed = res.speed; // 速度，以米/每秒计
                    let accuracy = res.accuracy; // 位置精度
                    geo = {
                        latitude,
                        longitude,
                        speed,
                        accuracy
                    };
                    dispatch(locationSucc(geo));
                    return true
                },
                fail: function (res) {
                    dispatch(locationFail());
                    return false
                },
                cancel: function (res) {
                    dispatch(locationFail());
                    return false
                }
            });
        });
    }

    render() {
        const { dispatch, state } = this.props;
        const { cart, message, content} = state;
        let takespace = {height: '1.2rem'};
        return (
            <div>
                <HomeHeader store={content.storeInfo}/>
                <div className="takespace" style={takespace}></div>
                <Message msgContent={message}
                         clearMessage={() => dispatch(setMessage({errorMessage: ""}))}
                />
                <BannerContainer bannerData={content.banner}/>
                <SelectContainer selectorData={content.selector}
                                 onSelectClick={ key => dispatch(changeSubContent(key)) }
                                 currentKey = {content.currentKey}
                />
                <SubContent
                    contentData={content.currentSub}
                    storeData={content.storeInfo}
                    addToCart={(item) => dispatch(addToCart(item))}
                />
                <BottomButton cart={cart.cart}
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