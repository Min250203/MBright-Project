import Cart from "./cart.js";
import {
  renderListProduct,
  fetchData,
  addEventProducts,
  convertToString,
  setLocalstorage,
  redirectLogin,
  redirectSignUp,
  redirectHome,
  checkLogin,
  clearLocalstorage,
} from "./helper/index.js";

const productItem = $(".all__product");
const logo = $(".logo");
const home = $(".home__page");
const btnBuy = $$(".btn__buy_product");
const detailImage = $$(".dImage");
const btnUser = $(".icon-user");
const btnSignUp = $("._singUp");
const btnLogin = $("._singIn");
const inputEmail = $(".email-input");
const inputPass = $(".pass-input");
const signUpInputEmail = $(".email-input_signUp");
const signUpInputPass = $(".pass-input_signUp");
const submitLogin = $(".signIn");
const submitSignUp = $(".signUp");
const iconCart = $(".icon-cart");
const loginBtn = $(".login_btn");
const logoutBtn = $(".logout_btn");

const Product = {
  cart: [],
  statusColor: "",
  statusSize: 0,
  quantityProduct: 1,
  handleRenderProduct: function () {
    let _this = this;

    iconCart.onclick = async function () {
      await Cart.showCart();
    };
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
      redirectHome();
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

    loginBtn.onclick = function () {
      redirectLogin();
    };
    logoutBtn.onclick = function () {
      clearLocalstorage("user");
      redirectHome()
      checkLogin();
    };
    btnSignUp.onclick = function () {
      redirectSignUp();
    };
    btnLogin.onclick = function () {
      $(".content__infor_logIn").classList.remove("change__product");
      $(".content__infor_logIn").classList.add("return__page");
      $(".content__infor_signUp").classList.remove("return__page");
      $(".content__infor_signUp").classList.add("change__product");
    };
    // inputEmail.oninput = function(e) {
    //   console.log(e.target.value)
    // }
    submitLogin.onclick = async function () {
      try {
        const data = await fetchData(
          "/users/login/beta",
          "POST",
          convertToString({
            email: inputEmail.value,
            password: inputPass.value,
          })
        );
        if (data.status === 200) {
          $(".container").classList.remove("change__product");
          $(".container__overlay_login").classList.remove("return__page");
          $(".container").classList.add("return__page");
          $(".container__overlay_login").classList.add("change__product");
          inputEmail.value = "";
          inputPass.value = "";

          setLocalstorage("user", data.payload);
          checkLogin();
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    submitSignUp.onclick = async function () {
      try {
        const data = await fetchData(
          "/users/beta",
          "POST",
          convertToString({
            email: signUpInputEmail.value,
            password: signUpInputPass.value,
          })
        );

        if (data.status === 201) {
          $(".container").classList.remove("change__product");
          $(".container__overlay_login").classList.remove("return__page");
          $(".container").classList.add("return__page");
          $(".container__overlay_login").classList.add("change__product");
          (signUpInputEmail.value = ""), (signUpInputPass.value = "");

          setLocalstorage("user", data.payload);
          checkLogin();
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  },
};

const getProducts = async () => {
  const data = await fetchData("/products", "GET");

  if (data.status === 200) {
    const items = data.payload;
    const parentElement = document.querySelector(
      ".content__infor_product--first"
    );
    renderListProduct(items, parentElement);
    addEventProducts(items, parentElement);
  }
};

checkLogin();
getProducts();
Product.handleRenderProduct();
