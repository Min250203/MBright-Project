import Cart from "./cart.js";
import {
  renderListProduct,
  fetchData,
  addEventProducts,
} from "./helper/index.js";

const productItem = $(".all__product");
const logo = $(".logo");
const home = $(".home__page");
const fortfolioProduct = $(".product__fortfolio");
const btnBuy = $$(".btn__buy_product");
const btnClose = $(".icon-close");
const detailImage = $$(".dImage");
const btnSize = $$(".select__size");
const addProduct = $(".add");
const minusProduct = $(".minus");
const buyCart = $(".btn__buy_item");
const addToCart = $(".btn__add_item");
const btnColor = $$(".box__color");
const btnUser = $('.icon-user');
const btnSignUp = $('._singUp');
const btnLogin = $('._singIn');

let listProduct = [];

const Product = {
  cart: [],
  statusColor: "",
  statusSize: 0,
  quantityProduct: 1,
  handleRenderProduct: function () {
    let _this = this;
    productItem.onclick = function () {
      $(".slider").classList.add("change__product");
      $(".content__pre_product").classList.add("change__product");
      $(".infor__fortfolio").classList.add("change__product");
      $(".content__infor_product").classList.add("change__product");
      $(".container__product_fortfolio").classList.add("change__product");
      $(".container__product").classList.add("return__page");
      $(".cart__product_order").classList.remove("return__page");
      $(".container__product_fortfolio").classList.remove("return__page");
    };

    home.onclick = function () {
      $(".slider").classList.remove("change__product");
      $(".content__pre_product").classList.remove("change__product");
      $(".infor__fortfolio").classList.add("change__product");
      $(".content__infor_product").classList.add("change__product");
      $(".container__product").classList.remove("return__page");
      $(".container__product_fortfolio").classList.remove("return__page");
      $(".cart__product_order").classList.remove("return__page");
    };
    logo.onclick = function () {
      $(".slider").classList.remove("change__product");
      $(".content__pre_product").classList.remove("change__product");
      $(".infor__fortfolio").classList.add("change__product");
      $(".content__infor_product").classList.add("change__product");
      $(".container__product").classList.remove("return__page");
      $(".container__product_fortfolio").classList.remove("return__page");
      $(".cart__product_order").classList.remove("return__page");
    };
    btnBuy.forEach((element) => {
      element.onclick = function () {
        console.log(element.parentNode.parentNode);
        $(".container__overlay").classList.add("return__page");
        $(".name__infor_product").textContent =
          element.parentNode.querySelector(".name__item").textContent;
        $(".price").textContent =
          element.parentNode.querySelector(".price__item").textContent;
        $(".mImage").src = element.parentNode.parentNode.querySelector(
          ".item__iamge_product"
        ).src;
      };
    });
    detailImage.forEach((element) => {
      element.onclick = function (e) {
        $(
          ".mImg__product"
        ).innerHTML = `<img class="mImage" src="${e.target.src}"
                        alt="">`;
      };
    });
    addProduct.onclick = function () {
      let quantity = Number($(".quantity__real").textContent);
      console.log(quantity++);
      $(".quantity__real").textContent = `${quantity++}`;
      _this.quantityProduct = Number($(".quantity__real").textContent);
    };
    minusProduct.onclick = function () {
      let quantity = Number($(".quantity__real").textContent);
      console.log(quantity--);

      if (quantity >= 0) {
        $(".quantity__real").textContent = `${quantity--}`;
        _this.quantityProduct = Number($(".quantity__real").textContent);
      } else {
        console.log("hihih");
      }
    };
    btnUser.onclick = function () {
      $('.container').classList.add("change__product");
      $(".container__overlay_login").classList.add("return__page");
    }
    btnSignUp.onclick = function () {
      $('.content__infor_signUp').classList.remove("change__product");
      $(".content__infor_signUp").classList.add("return__page");
      $(".content__infor_logIn").classList.remove("return__page");
      $(".content__infor_logIn").classList.add("change__product");
    }
    btnLogin.onclick = function () {
      $('.content__infor_logIn').classList.remove("change__product");
      $(".content__infor_logIn").classList.add("return__page");
      $(".content__infor_signUp").classList.remove("return__page");
      $(".content__infor_signUp").classList.add("change__product");


    }
    // buyCart.onclick = function () {
    //     $('.slider').classList.add('change__product');
    //     $('.content__pre_product').classList.add('change__product');
    //     $('.container__content').classList.add('change__product');
    //     $('.container__product_fortfolio').classList.remove('return__page')
    //     $('.container__product').classList.remove('return__page');
    //     $('.container__cart').classList.add('return__page');
    //     $('.container__overlay').classList.remove('return__page')
    // }
    addToCart.onclick = function () {
      console.log("hihiiiiiihihihihi");
      console.log(
        _this.statusColor,
        "co",
        _this.statusSize,
        "size",
        _this.quantityProduct,
        "quan"
      );
      let nameProduct = $(".btn__add_item").parentNode.parentNode.querySelector(
        ".name__infor_product"
      ).textContent;
      let priceProduct =
        $(".btn__add_item").parentNode.parentNode.querySelector(
          ".price"
        ).textContent;
      let imgProduct =
        $(".btn__add_item").parentNode.parentNode.parentNode.querySelector(
          ".mImage"
        ).src;
      let product = {
        name: nameProduct,
        price: priceProduct,
        color: _this.statusColor,
        size: _this.statusSize,
        quantity: _this.quantityProduct,
        img: imgProduct,
      }; _this.cart.push(product)
      Cart.handleGoSeeOrder(_this.cart)
      $('.popUp__access').classList.add('return__page');
      _this.statusColor = 0;
      _this.statusSize = 0
      _this.handleTime();
    };
  },
  handleTime: function () {
    setTimeout(() => {
      $('.popUp__access').classList.remove('return__page');
      $('.popUp__err').classList.remove('return__page');


    }, 2000)
    // clearTimeout(timeAdd);
  }
}

Product.handleRenderProduct();

const getProducts = async () => {
  const data = await fetchData("/products", "GET");

  if (data.status === 200) {
    const items = data.payload;
    const parentElement = document.querySelector(
      ".content__infor_product--first"
    );
    renderListProduct(items, parentElement);
    addEventProducts(items, parentElement);
    listProduct = items;
  }
};

getProducts();
