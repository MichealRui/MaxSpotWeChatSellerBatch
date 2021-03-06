/**
 * Created by ruibing on 17/1/17.
 */
import { combineReducers } from 'redux'
import content from './Home'
import message from './Message'
import loading from './Loading'
import cart from './Cart'
import weixin from './WeiXin'
import productDetail from './ProductDetail'
import brandDetail from './BrandDetail';
import switchShop from './SwitchShop';
import shopDetail from './ShopDetail';
import shoppingCart from './ShoppingCart';
import confirmOrder from './ConfirmOrder'
import orderList from './OrderList';
import orderDetail from './OrderDetail';
import afterPay from './AfterPay'
import paySuccess from './PaySuccess'
import takeGoods from './TakeGoods'
import bannerDetail from './BannerDetail'
import promotion from './Promotion'
export default combineReducers({
    content,
    cart,
    weixin,
    message,
    loading,
    productDetail,
    brandDetail,
    switchShop,
    shopDetail,
    shoppingCart,
    confirmOrder,
    orderList,
    orderDetail,
    afterPay,
    paySuccess,
    takeGoods,
    bannerDetail,
    promotion
})

