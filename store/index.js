import { fetchCartItems } from '~/api'

export const state = () => ({
  carts: [],
})

export const mutations = {
  removeItemToCart(state, id) {
    state.carts.forEach((x, i) => {
      if (x.id === id) {
        state.carts.splice(i, 1)
      }
    })
  },
  addItemToCart(state, item) {
    state.carts.push(item)
  },
  setCarts(state, carts) {
    state.carts = carts
  },
}

export const actions = {
  async fetchCarts(context) {
    const { data } = await fetchCartItems()
    const items = data.map((item) => ({
      ...item,
      imageUrl: `${item.imageUrl}?random=${Math.random()}`,
    }))
    context.commit('setCarts', items)
  },

  // async nuxtServerInit(storeContext, nuxtContext) {
  //   const { data } = await fetchCartItems()
  //   const items = data.map((item) => ({
  //     ...item,
  //     imageUrl: `${item.imageUrl}?random=${Math.random()}`,
  //   }))
  //   storeContext.commit('setCarts', items)
  // },
  // 넉스트서버이닛은 랜더링전 데이터를 스토어에 불러놓는다 프론트 화면에서 ayncdata 없애도 불러옴
}
