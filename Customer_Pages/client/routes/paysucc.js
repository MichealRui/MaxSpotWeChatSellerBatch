/**
 * Created by ruibing on 17/5/4.
 */
module.exports = {
    path:'paySucc/:orderNumber',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../containers/PaySuccessContainer/PaySuccessContainer').default)
        }, 'PaySucc')
    },
};