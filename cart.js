
const iconCart = $('.icon-cart');
const Cart = {
    handleGoSeeOrder: function (order) {
        iconCart.onclick = function () {
            console.log(order)
            $('.slider').classList.add('change__product');
            $('.content__pre_product').classList.add('change__product');
            $('.container__content').classList.add('change__product');
            $('.container__product_fortfolio').classList.remove('return__page')
            $('.container__product').classList.remove('return__page');
            $('.cart__product_order').classList.add('return__page');
            // ${product.size === 1 ? Size 1: product.size === 2 ? Size 2: product.size === 3 ? Size 3:Size 4 }
            let cartOrderHtml = order.map((product) => {
                console.log(product)
                return `
                    <div class="cart__product">
                        <div class="product__order">
                            <input class="checkbox" type="checkbox">
                            <div class="image__product_order">
                                <img class="image_product_"
                                    src="${product.img}"
                                    alt="">
                            </div>
                            <div class="detail__product_order">
                                <div class="name__product_order">${product.name}</div>
                                <div class="infor__detail_preOrder">
                                    <div class="mSelect">
                                        <div class="mcolor_">
                                            <select name="color_" form="" class="color_">
                                                <option value="black">${product.color === "black" ? "BLACK" : product.color === "white" ? "WHITE" : product.color === "red" ? "RED" : "GREEN"}</option>
                                                <option value="red">RED</option>
                                                <option value="white">WHITE</option>
                                            </select>
                                        </div>
                                        <div class="mSize">
                                            <select name="size_" form="" class="size_">
                                                <option value="1">${product.size === 1 ? "Size 1" : product.size === 2 ? "Size 2" : product.size === 3 ? "Size 3" : "Size 4"}</option >
                                                <option value="2">Size 2</option>
                                                <option value="3">Size 3</option>
                                                <option value="4">Size 4</option>
                                            </select >
                                        </div >
                                    </div >
                                    <div class="quantity_">
                                        <div class="action__quantity_">
                                            <i class=" minus fa-solid fa-minus"></i>
                                            <span class="quantity__real">${product.quantity}</span>
                                            <i class="add fa-solid fa-plus"></i>
                                        </div>
                                    </div>
                                </div >
                                <div class="more">Xem thêm</div>
                                <div class="total">
                                    <div class="name__total">Tổng cộng</div>
                                    <div class="quantity__total">${product.price} </div>
                                </div>
                            </div >
                        </div >
                    </div >
    `
            })

            $('.container__cart').innerHTML = cartOrderHtml.join("")

        }
    }
}

Cart.handleGoSeeOrder();
export default Cart;