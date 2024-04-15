

const listProduct = [
    {
        name: 'T-Shirt',
        desc: 'T-Shirt Unisex Thời Trang',
        product: [
            {
                nameProduct: 'Levents® Classic Regular Tee/ Black',
                src: 'https://levents.asia/cdn/shop/files/MT.jpg?v=1700560359&width=713',
                price: '390.000 VND',
                id: 1
            },
            {
                nameProduct: 'Levents® Classic Regular Tee/ White',
                src: 'https://levents.asia/cdn/shop/files/MT_ea19d57c-5a2b-4f0f-93c5-c282772cec98.jpg?v=1700560565&width=713',
                price: '390.000 VND',
                id: 1
            },
            {
                nameProduct: 'LEVENTS® "MY ANIMALS" SERIES BEAR TEE / CREAM',
                src: 'https://levents.asia/cdn/shop/files/ANIMALTEE-GC1.jpg?v=1700501090&width=713',
                price: '390.000 VND',
                id: 1
            },
            {
                nameProduct: 'Levents® 2Lip Tee/ Cream',
                src: 'https://levents.asia/cdn/shop/files/Cream_LTSOVCOA402UC0101FW22_1.jpg?v=1711366498&width=713',
                price: '390.000 VND',
                id: 1
            }

        ]

    },
    {
        name: 'Sweater',
        desc: 'Sweater Unisex Thời Trang',
        product: [
            {
                nameProduct: 'Levents® Dragon Sweater/ Red',
                src: 'https://levents.asia/cdn/shop/files/Red_LSWOVCOK403UR0102SS24_1.jpg?v=1711446698&width=713',
                price: '510.000 VND',
                id: 1
            },
            {
                nameProduct: 'Levents® Beautiful Things Sweater/ Green',
                src: 'https://levents.asia/cdn/shop/files/Green_LSWOVCOK304UG0102SS24_1.jpg?v=1711446906&width=713',
                price: '390.000 VND',
                id: 1
            },
            {
                nameProduct: 'Levents® Classic Sweater/ Cream',
                src: 'https://levents.asia/cdn/shop/files/MT_12596c42-5af0-49bd-af64-eb53fefa4d7b.jpg?v=1700639123&width=713',
                price: '390.000 VND',
                id: 1
            }


        ]

    }
];

const itemFortfolio = $$('.fortfolio__product');


const FortforlioProduct = {
    handleRenderProduct: function () {
        let _this = this
        itemFortfolio.forEach((item) => {
            item.onclick = function (e) {
                $('.slider').classList.add('change__product');
                $('.content__pre_product').classList.add('change__product');
                $('.container__content').classList.add('change__product');
                $('.container__product_fortfolio').classList.add('return__page')
                $('.container__product').classList.remove('return__page');
                $('.cart__product_order').classList.remove('return__page');

                let valueItem = e.target.textContent;
                let products = listProduct.filter((item) => item.name === valueItem)
                $('.name__product_fortfolio_').textContent = `${products[0].name}`
                $('.desc__prodcut_fortfolio').textContent = `${products[0].desc}`

                let renderProductHtmls = products[0].product.map((item) => {
                    console.log(item)
                    return `
                <div class="infor__product">
                        <div class="image__product">
                            <img class="item__iamge_product"
                                src="${item.src}" alt="">
                        </div>
                        <div class="descr__product">
                            <div class="name__item">${item.nameProduct}</div>
                            <div class="descr__item">
                                <div class="price__item">${item.price} </div>
                            </div>
                            <button class="btn__buy_product">Mua Ngay</button>
                        </div>
                    </div>
                `
                })
                $('.content__fortfolio_product').innerHTML = renderProductHtmls.join("");
                _this.handleAction()


            }
        })
    },
    handleAction: function () {
        let element = $('.content__fortfolio_product')
        element.querySelectorAll('.btn__buy_product').forEach((element) => {
            element.onclick = function () {
                $('.container__overlay').classList.add('return__page');
                $('.name__infor_product').textContent = element.parentNode.querySelector('.name__item').textContent
                $('.price').textContent = element.parentNode.querySelector('.price__item').textContent
                $('.mImage').src = element.parentNode.parentNode.querySelector('.item__iamge_product').src
            


            }
        })
        
    }

}

FortforlioProduct.handleRenderProduct();