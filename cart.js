const iconCart = $(".icon-cart");

import {
  fetchData,
  convertToString,
  getLocalstorage,
  redirectLogin,
} from "./helper/index.js";

const Cart = {
  dataCartProduct: [],
  quantityItem: "",
  status: 0,
  showCart: async function (order) {
    const inforUser = getLocalstorage("user");

    if (!inforUser) {
      alert("Vui lòng đăng nhập");
      redirectLogin();
      return;
    }

    let _this = this;
    $(".slider").classList.add("change__product");
    $(".content__pre_product").classList.add("change__product");
    $(".infor__fortfolio").classList.add("change__product");
    $(".content__infor_product").classList.add("change__product");
    $(".container__product_fortfolio").classList.remove("return__page");
    $(".container__product").classList.remove("return__page");
    $(".cart__product_order").classList.add("return__page");

    const data = await fetchData(`/carts/${inforUser._id}`, "GET");
    if (data.status === 200) {
      _this.dataCartProduct = data.payload.cart_products;
      _this.status = 0;
    }
    let cartOrderHtml = _this.dataCartProduct.map((product) => {
      return `
                    <div class="cart__product">
                        <div class="product__order">
                            <input class="checkbox" type="checkbox">
                            <div class="image__product_order">
                                <img class="image_product_"
                                    src="${
                                      ENDPOINT_IMAGE + product.product.thumbnail
                                    }"
                                    alt="">
                            </div>
                            <div class="detail__product_order">
                                <div class="name__product_order">${
                                  product.product.title
                                }</div>
                                <div class="infor__detail_preOrder">
                                    <div class="quantity_">
                                        <div class="action__quantity_">
                                            <i class=" minus fa-solid fa-minus"></i>
                                            <span class="quantity__real">${
                                              product.quantity
                                            }</span>
                                            <i class="add fa-solid fa-plus"></i>
                                        </div>
                                    </div>
                                    <div class="more__and_more">
                                     <div class="more">Xem thêm</div>
                                     <i class="icon-delete fa-solid fa-trash"></i>
                                    </div>
                                </div >
                               
                                <div class="total">
                                    <div class="name__total">Tổng cộng</div>
                                    <div class="quantity__total">${product.product.price.toLocaleString(
                                      "it-IT",
                                      { style: "currency", currency: "VND" }
                                    )} </div>
                                </div>
                            </div >
                        </div >
                    </div >
    `;
    });

    $(".container__cart").innerHTML = cartOrderHtml.join("");

    $$(".cart__product").forEach((item) => {
      item.querySelector(".icon-delete").onclick = function (e) {
        let titleItem = item.querySelector(".name__product_order").textContent;
        let itemDeleted = _this.dataCartProduct.filter(
          (item) => item.product.title === titleItem
        );
        _this.handleDeleteItem(itemDeleted);
      };
      item.querySelector(".add").onclick = function () {
        _this.quantityItem = item.querySelector(".quantity__real");
        _this.status = 1;
        let titleItem = item.querySelector(".name__product_order").textContent;
        let itemUpdate = _this.dataCartProduct.filter(
          (item) => item.product.title === titleItem
        );
        _this.handleUpdateItem(itemUpdate);
      };
      item.querySelector(".minus").onclick = function () {
        _this.status = 2;
        _this.quantityItem = item.querySelector(".quantity__real");
        // id
        let titleItem = item.querySelector(".name__product_order").textContent;
        let itemUpdate = _this.dataCartProduct.filter(
          (item) => item.product.title === titleItem
        );
        _this.handleUpdateItem(itemUpdate);
      };
    });
  },
  handleDeleteItem: async function (item) {
    const inforUser = getLocalstorage("user");

    if (!inforUser) {
      alert("Vui lòng đăng nhập");
      redirectLogin();
      return;
    }

    let variationId = item[0].variation !== null ? item[0].variation._id : null;
    let productId = item[0].product._id;
    try {
      const data = await fetchData(
        `/carts/item/${inforUser._id}`,
        "POST",
        convertToString({
          variation_id: variationId !== null ? variationId : null,
          product_id: productId,
        })
      );
      this.dataCartProduct = data.payload.cart_products;
      let cartOrderHtml = this.dataCartProduct.map((product) => {
        return `
                    <div class="cart__product">
                        <div class="product__order">
                            <input class="checkbox" type="checkbox">
                            <div class="image__product_order">
                                <img class="image_product_"
                                    src="${
                                      ENDPOINT_IMAGE + product.product.thumbnail
                                    }"
                                    alt="">
                            </div>
                            <div class="detail__product_order">
                                <div class="name__product_order">${
                                  product.product.title
                                }</div>
                                <div class="infor__detail_preOrder">
                                    <div class="quantity_">
                                        <div class="action__quantity_">
                                            <i class=" minus fa-solid fa-minus"></i>
                                            <span class="quantity__real">${
                                              product.quantity
                                            }</span>
                                            <i class="add fa-solid fa-plus"></i>
                                        </div>
                                    </div>
                                    <div class="more__and_more">
                                     <div class="more">Xem thêm</div>
                                     <i class="icon-delete fa-solid fa-trash"></i>
                                    </div>
                                </div >
                               
                                <div class="total">
                                    <div class="name__total">Tổng cộng</div>
                                    <div class="quantity__total">${product.product.price.toLocaleString(
                                      "it-IT",
                                      { style: "currency", currency: "VND" }
                                    )} </div>
                                </div>
                            </div >
                        </div >
                    </div >
    `;
      });
      $(".container__cart").innerHTML = cartOrderHtml.join("");
    } catch (error) {
      console.error("Error:", error);
    }
  },
  handleUpdateItem: async function (item) {
    const inforUser = getLocalstorage("user");

    if (!inforUser) {
      alert("Vui lòng đăng nhập");
      redirectLogin();
      return;
    }

    let variationId = item[0].variation !== null ? item[0].variation._id : null;
    let productId = item[0].product._id;
    let inventoryItem = item[0].product.inventory;
    let quantity = item[0].quantity;

    try {
      const data = await fetchData(
        `/carts/update/${inforUser._id}`,
        "POST",
        convertToString({
          variation_id: variationId !== null ? variationId : null,
          product_id: productId,
          quantity: this.status === 1 ? ++quantity : --quantity,
        })
      );
      if (quantity++ <= inventoryItem || quantity-- > 0) {
        this.dataCartProduct = data.payload.cart_products;
        let tempItem = this.dataCartProduct.filter(
          (item) => item.product._id === productId
        );
        this.quantityItem.textContent = `${tempItem[0].quantity}`;
        this.showCart();
      } else {
        // alert('Số lượng trong kho không đủ')
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
};

// Cart.handleGoSeeOrder();
export default Cart;
