'use strict';
import React from 'react';
import Item from '../../components/Item/index'
import AddButton from '../../components/AddButton/addButton'
import SwiperComponent from '../../components/Swiper/index'
// import MasonryMixin from './MasonryMixin'
require('./index.css');

var masonryOptions = {
    transitionDuration: 0
};

var ItemContainer = React.createClass({

    render() {
        let swiperConfig = {
            // pagination: '.swiper2 .swiper-pagination',
            freeMode: true,
            slidesPerView: 6,
        };
        let props = this.props.items;
        let items = props.map((item, index) => {
            return(
                <Item item={item} key={index}
                      isSliderItem={false}
                      click={this.props.itemClick}
                      store={this.props.store}
                      show={this.props.detailClick}
                />
            )
        });
        return (
            <div className="itemContainer" >
                <SwiperComponent
                    swiperConfig={swiperConfig}
                    swiperContainer={'swiper2'}
                >
                    {items}
                </SwiperComponent>
            </div>
        )
    }
});


module.exports = ItemContainer;