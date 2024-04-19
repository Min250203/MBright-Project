
const iconCart = $('.icon-cart');

import {
    renderListProduct,
    fetchData,
    addEventProducts,
} from "./helper/index.js";

const Cart = {
    dataCartProduct: [],
    handleGoSeeOrder: function (order) {
        let _this = this;
        iconCart.onclick = async function () {
            console.log(order)
            $('.slider').classList.add('change__product');
            $('.content__pre_product').classList.add('change__product');
            $('.container__content').classList.add('change__product');
            $('.container__product_fortfolio').classList.remove('return__page')
            $('.container__product').classList.remove('return__page');
            $('.cart__product_order').classList.add('return__page');

            const data = await fetchData("/carts/66063f8e346942e815a9cd3c", "GET");
            if (data.status === 200) {
                _this.dataCartProduct = data.payload.cart_products;
            }
            let cartOrderHtml = _this.dataCartProduct.map((product) => {
                console.log(product)
                console.log(product.product.thumbnail)
                return `
                    <div class="cart__product">
                        <div class="product__order">
                            <input class="checkbox" type="checkbox">
                            <div class="image__product_order">
                                <img class="image_product_"
                                    src="${ENDPOINT_IMAGE + product.product.thumbnail}"
                                    alt="">
                            </div>
                            <div class="detail__product_order">
                                <div class="name__product_order">${product.product.title}</div>
                                <div class="infor__detail_preOrder">
                                    <div class="quantity_">
                                        <div class="action__quantity_">
                                            <i class=" minus fa-solid fa-minus"></i>
                                            <span class="quantity__real">${product.quantity}</span>
                                            <i class="add fa-solid fa-plus"></i>
                                        </div>
                                    </div>
                                    <div class="more">Xem thêm</div>
                                </div >
                               
                                <div class="total">
                                    <div class="name__total">Tổng cộng</div>
                                    <div class="quantity__total">${(product.product.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </div>
                                </div>
                            </div >
                        </div >
                    </div >
    `
            })

            $('.container__cart').innerHTML = cartOrderHtml.join("")

        }
        // addProduct.onclick = function () {
        //     let quantity = Number($(".quantity__real").textContent);
        //     console.log(quantity++);
        //     $(".quantity__real").textContent = `${quantity++}`;
        //     _this.quantityProduct = Number($(".quantity__real").textContent);
        // };
        // minusProduct.onclick = function () {
        //     let quantity = Number($(".quantity__real").textContent);
        //     console.log(quantity--);

        //     if (quantity >= 0) {
        //         $(".quantity__real").textContent = `${quantity--}`;
        //         _this.quantityProduct = Number($(".quantity__real").textContent);
        //     } else {
        //         console.log("hihih");
        //     }
        // };
    }
}

Cart.handleGoSeeOrder();
export default Cart;