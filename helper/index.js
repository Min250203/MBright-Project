const productHtml = (data) => {
  return ` <div class="infor__product">
        <div class="image__product">
            <img class="item__iamge_product"
                src='${ENDPOINT_IMAGE + data.thumbnail}'
                alt="">
        </div>
        <div class="descr__product">
            <div data-product="${data._id}" class="name__item">${
    data.title
  }</div>
            <div class="descr__item">
                <div class="price__item">${data.price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}</div>
            </div>
            <button class="btn__buy_product">Mua Ngay</button>
        </div>
        </div>`;
};

const renderListProduct = (items, parentEl) => {
  let listHtml = items.map((item) => {
    return productHtml(item);
  });

  listHtml = listHtml.join(" ");

  if (parentEl) {
    parentEl.innerHTML = listHtml;
  }
};

const addEventProducts = (items, parentEl) => {
  const btnBuy = parentEl.querySelectorAll(".btn__buy_product");
  const btnClose = $(".icon-close");
  const addToCart = $(".btn__add_item");

  const addProduct = $(".add");
  const minusProduct = $(".minus");

  btnBuy.forEach((element, index) => {
    element.onclick = function () {
      $(".container__overlay").classList.add("return__page");
      $(".name__infor_product").textContent =
        element.parentNode.querySelector(".name__item").textContent;
      $(".price").textContent =
        element.parentNode.querySelector(".price__item").textContent;
      $(".name__infor_product").dataset.product =
        element.parentNode.querySelector(".name__item").dataset.product;
      $(".price").textContent =
        element.parentNode.querySelector(".price__item").textContent;
      $(".mImage").src = element.parentNode.parentNode.querySelector(
        ".item__iamge_product"
      ).src;

      const listImages = items[index].gallery.map((item) => {
        return `<img class="dImage" src="${ENDPOINT_IMAGE + item}"
            alt="">`;
      });
      $(".detail__image").innerHTML = listImages.join(" ");

      const detailImage = $$(".dImage");

      detailImage.forEach((element) => {
        element.onclick = function (e) {
          $(
            ".mImg__product"
          ).innerHTML = `<img class="mImage" src="${e.target.src}"
                      alt="">`;
        };
      });
    };
  });
  btnClose.onclick = function () {
    $(".container__overlay").classList.remove("return__page");
    $(".quantity__real").textContent = `1`;
  };
  addProduct.onclick = function () {
    let quantity = Number($(".quantity__real").textContent);
    $(".quantity__real").textContent = `${++quantity}`;
  };
  minusProduct.onclick = function () {
    let quantity = Number($(".quantity__real").textContent);
    if (quantity >= 0) {
      $(".quantity__real").textContent = `${--quantity}`;
    } else {
    }
  };
  addToCart.onclick = async function () {
    const inforUser = getLocalstorage("user");

    if (!inforUser) {
      alert("Vui lòng đăng nhập");
      redirectLogin();
      return;
    }

    let productDataId = $(".btn__add_item").parentNode.parentNode.querySelector(
      ".name__infor_product"
    ).dataset.product;
    let itemAdd = items.find((item) => item._id === productDataId);

    if (!itemAdd) {
      alert("Lỗi vui lòng thử lại");
      return;
    }
    // let variationId = itemAdd.variation !== null ? itemAdd.variation : null;
    let productId = itemAdd._id;
    let quantity = Number($(".quantity__real").textContent);
    try {
      const data = await fetchData(
        `/carts/increase/${inforUser._id}`,
        "POST",
        convertToString({
          // variation_id: variationId !== null ? variationId : null,
          product_id: productId,
          quantity: quantity,
        })
      );
      if (data.status === 201) {
        alert("Sản phẩm được thêm vào giỏ hàng thành công");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
};

const redirectLogin = () => {
  $(".container").classList.add("change__product");
  $(".container__overlay_login").classList.add("return__page");
  $(".container").classList.remove("return__page");
  $(".container__overlay_login").classList.remove("change__product");
  $$(".back_home").forEach((item) => (item.onclick = () => redirectHome()));
};

const redirectSignUp = () => {
  $(".content__infor_signUp").classList.remove("change__product");
  $(".content__infor_signUp").classList.add("return__page");
  $(".content__infor_logIn").classList.remove("return__page");
  $(".content__infor_logIn").classList.add("change__product");
};

const redirectHome = () => {
  $(".container").classList.remove("change__product");
  $(".container__overlay_login").classList.remove("return__page");
  $(".container").classList.add("return__page");
  $(".container__overlay_login").classList.add("change__product");

  $(".slider").classList.remove("change__product");
  $(".content__pre_product").classList.remove("change__product");
  $(".infor__fortfolio").classList.remove("change__product");
  $(".content__infor_product").classList.remove("change__product");
  // $(".container__product_fortfolio").classList.add("return__page");
  // $(".container__product").classList.add("return__page");
  $(".cart__product_order").classList.remove("return__page");
};

const checkLogin = () => {
  const inforUser = getLocalstorage("user");
  const loginBtn = $(".login_btn");
  const logoutBtn = $(".logout_btn");

  if(!inforUser) {
    loginBtn.classList.add("block");
    logoutBtn.classList.add("hidden");
    loginBtn.classList.remove("hidden");
    logoutBtn.classList.remove("block");
  } else {
    loginBtn.classList.add("hidden");
    logoutBtn.classList.add("block");
    loginBtn.classList.remove("block");
    logoutBtn.classList.remove("hidden");
  }
}

const fetchData = async (path, method, body = null) => {
  return await fetch(ENDPOINT_SERVER + path, {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => err);
};

const convertToString = (payload) => {
  return JSON.stringify(payload);
};

const setLocalstorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const clearLocalstorage = (key) => {
  localStorage.removeItem(key)
}

const getLocalstorage = (key) => {
  const value = localStorage.getItem(key);

  if (!value) return null;

  return JSON.parse(value);
};

export {
  renderListProduct,
  fetchData,
  convertToString,
  addEventProducts,
  setLocalstorage,
  getLocalstorage,
  clearLocalstorage,
  redirectLogin,
  redirectHome,
  redirectSignUp,
  checkLogin
};
