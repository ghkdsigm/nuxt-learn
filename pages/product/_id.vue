<template>
  <div>
    <div class="container">
      <div class="main-panel">
        <img
          class="product-image"
          :src="product.imageUrl"
          :alt="product.name"
        />
      </div>
      <div class="side-panel">
        <p class="name">{{ product.name }}</p>
        <p class="price">{{ Math.floor(product.price) }}</p>
        <button type="button" @click="addToCart">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import { createCartItem, fetchProductById } from '~/api'

export default {
  async asyncData({ params, store }) {
    const response = await fetchProductById(params.id)
    return { product: response.data }
  },
  data() {
    return {
      preData: '',
      zzzz: this.$store.state.carts,
    }
  },
  mounted() {
    // this.preData = this.$store.state.carts
    // const res = this.preData.forEach((v) => v)
    // for (let i = 0; i < this.preData.length; i++) {
    //   this.zzzz = this.preData[i].name
    // }
  },
  methods: {
    async addToCart() {
      await createCartItem(this.product)
      // eslint-disable-next-line array-callback-return
      // console.log(this.zzzz)
      // eslint-disable-next-line array-callback-return
      this.zzzz.map((v, i) => {
        console.log(v)
        // if (v.name !== this.product.name) {
        //   this.$store.commit('addItemToCart', this.product)
        // } else {
        //   alert('이미 장바구니에 담겨져있습니다.')
        // }
      })
      // eslint-disable-next-line prettier/prettier
      // if(!this.product.name.indexOf(preData)){
      //   console.log(this.product.name)
      // } else {
      //   console.log(preData)
      // }
      this.$store.commit('addItemToCart', this.product)
      this.$router.push('/cart')
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}
.product-image {
  width: 500px;
  height: 375px;
}
.side-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 220px;
  text-align: center;
  padding: 0 1rem;
}
</style>
