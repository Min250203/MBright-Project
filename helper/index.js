const productHtml = (data) => {
  return ` <div class="infor__product">
        <div class="image__product">
            <img class="item__iamge_product"
                src='${ENDPOINT_IMAGE + data.thumbnail}'
                alt="">
        </div>
        <div class="descr__product">
            <div class="name__item">${data.title}</div>
            <div class="descr__item">
                <div class="price__item">${data.price}</div>
            </div>
            <button class="btn__buy_product">Mua Ngay</button>
        </div>
        </div>`;
};

const attributesHtml = (data) => {
  const list = data.map((option) => {
    return `<div class="size__item">${option.name}</div>
        <div class="size__infor_product">
            ${option.values.map((value) => {
      return `<button class="select__size size1">${value.label}</button>`;
    })}
        </div>`;
  });

  return list.join(" ");
};

const productDetailHtml = (data) => {
  return `
            <div class="detail__infor_product">
                <div class="name__infor_product">${data.title}</div>
                <div class="price">${data.price} VND</div>
                <div class="color__item">Màu</div>
                <div class="color__infor_product">
                    <div class="box__color color1">
                        <div class="item__color" style="background-color: #000"></div>
                    </div>
                    <div class="box__color color2">
                        <div class="item__color" style="background-color: #ccc"></div>
                    </div>
                    <div class="box__color color3">
                        <div class="item__color" style="background-color: red"></div>
                    </div>
                    <div class="box__color color4">
                        <div class="item__color" style="background-color: green"></div>
                    </div>
                </div>
                <div class="size__item">Size</div>
                <div class="size__infor_product">
                    <button class="select__size size1">Size 1</button>
                    <button class="select__size size2">Size 2</button>
                    <button class="select__size size3">Size 3</button>
                    <button class="select__size size4">Size 4</button>
                </div>

                <div class="quantity">
                    <div class="name__quantity">Số lượng</div>
                    <div class="action__quantity">
                        <i class=" minus fa-solid fa-minus"></i>
                        <span class="quantity__real">1</span>
                        <i class="add fa-solid fa-plus"></i>
                    </div>
                </div>
                <div class="btn__action">
                    <button class="btn__buy_item">Mua Ngay</button>
                    <button class="btn__add_item">Thêm vào giỏ hàng</button>
                </div>
                <div class="detail__des">${data.description}</div>
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

  btnBuy.forEach((element, index) => {
    element.onclick = function () {
      $(".container__overlay").classList.add("return__page");
      $(".name__infor_product").textContent =
        element.parentNode.querySelector(".name__item").textContent;
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

      const attributeParentEl = $(".product_option");
      if (items[index].options.length > 0) {
        attributeParentEl.innerHTML = attributesHtml(items[index].options);
      } else {
        attributeParentEl.innerHTML = "";
      }
    };
  });
  btnClose.onclick = function () {
    $(".container__overlay").classList.remove("return__page");
    $(".quantity__real").textContent = `1`;
    // btnSize.forEach((btn) => {
    //   btn.classList.remove("change__color_select");
    // });
    // btnColor.forEach((e) => {
    //   e.classList.remove("change__color_color");
    // });
  };
};

const fetchData = async (path, method, body = null) => {
  console.log("body", body)
  const data = await fetch(ENDPOINT_SERVER + path, {
    method, body, headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return data;
};

const convertToString = (payload) => {
  return JSON.stringify(payload);
};

export { renderListProduct, fetchData, convertToString, addEventProducts };
