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
}
