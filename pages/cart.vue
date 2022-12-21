<template>
  <div class="container">
    <h1 class="list-title">담긴 상품 목록</h1>
    <div class="list-wrapper">
      <ul>
        <li v-for="cart in carts" :key="cart.id" class="list-item">
          <img class="thumbnail" :src="cart.imageUrl" :alt="cart.name" />
          <div class="description">
            <p>{{ cart.name }}</p>
            <span>{{ Math.floor(cart.price) }}</span>
          </div>
          <button @click="delCarted(cart)">장바구니에서 삭제</button>
        </li>
      </ul>
      <div>
        <h3>장바구니 값</h3>
        <ul>
          <li>
            <span>물건</span>
            <div v-for="(item, index) in buyItem" :key="index">
              {{ item }}
            </div>
          </li>
          <li>
            <span>총 가격 합계 :</span> <span>{{ priceAllComputed }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="extra-panel">
      <button>구매하기</button>
    </div>
  </div>
</template>

<script>
import { deleteCartItem } from '../api'
export default {
  async asyncData({ store }) {
    await store.dispatch('fetchCarts')
  },
  data() {
    return {
      priceAll: this.$store.state.carts,
      priceAllComputed: 0,
      buyItem: [],
    }
  },
  computed: {
    carts() {
      return this.$store.state.carts
    },
  },
  mounted() {
    // eslint-disable-next-line prettier/prettier
    this.priceAll.forEach((v) => { 
      this.priceAllComputed += Number(v.price)
      this.buyItem.push(v.name)
    })
  },
  methods: {
    async delCarted(e) {
      await deleteCartItem(e.id)
      this.$store.commit('removeItemToCart', e.id)
      // console.log(e.id)
      this.priceAllComputed -= Number(e.price)
      // eslint-disable-next-line array-callback-return
      this.buyItem.map((v, i) => {
        // eslint-disable-next-line prettier/prettier
        if(v === e.name){
          this.buyItem.splice(i, 1)
        }
      })
      // this.$router.push('/cart')
    },
  },
}
</script>

<style scoped>
.container {
  margin: 2rem 10rem;
}
.list-title {
  font-weight: 700;
  font-size: 1.4rem;
}
.list-wrapper {
  margin: 0.4rem 0;
}
.list-item {
  display: flex;
}
.thumbnail {
  width: 100px;
  height: 100px;
}
.description {
  padding: 2rem 1rem;
}
.extra-panel {
  text-align: right;
  padding: 0.2rem 0;
}
ul {
  list-style: none;
}
</style>
