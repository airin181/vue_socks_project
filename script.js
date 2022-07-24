Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }

    },
    template: `
    <div class="product">

    <div class="product-image">
        <img :src="image" />
    </div>

    <div class="product-info">
        <h1>{{ title }}</h1>
        <p>{{ productOnSale }}</p>
        <p v-if="inStock">In Stock</p>
        <p v-else
        :class="{outOfStock:!inStock}">Out of Stock
        </p>
        <p>Shipping: {{shipping}} </p>
        

        <ul>
            <li v-for="detail in details">
                {{detail}}
            </li>
        </ul>


        <div v-for="(variant,index) in variants"
             :key="variant.variantID"
             class="color-box"
             :style="{backgroundColor:variant.variantColor}"
             @mouseover="updateProduct(index)">
            
        </div>


        <button
        v-on:click="addToCart" :disabled="!inStock"
        :class="{disabledButton:!inStock}">
            Add to Cart
        </button>
        <div class="cart">
            <p>Cart({{cart}})</p>
        </div>
    </div>
 

</div>
    `,
    data() {
        return {
            brand: "Vue Mastery",
            product: 'Socks',
            selectedVariant: 0,
            //0 como punto de partida del index ¿?
            details: ["80% cotton", "20% polyester", "Gender-neutral"],

            onSale: false,
            variants: [
                {
                    variantId: 2243,
                    variantColor: "green",
                    variantImage: "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "./assets/blue_socks.jpeg",
                    variantQuantity: 0
                }
            ],
            cart: 0
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        productOnSale() {
            if (this.onSale === true) {
                return this.brand + ' ' + this.product + ' are on sale!'
            } else {
                return this.brand + ' ' + this.product + ' are sold out!'
            }
        },
        shipping() {
            if (this.premium) {
                return "Free"
            } 
            return 2.99
            
        }

    }

})


var app = new Vue({
    el: '#app',
    data: {
        premium: false
    }
})

