if (!Object.getOwnPropertyDescriptor(Location.prototype, 'query')) {
  Object.defineProperty(Location.prototype, 'query', {
    set(query) {
      const { protocol, host, pathname } = this
      const url = `${protocol}//${host}${pathname}?q=${query}`
      history.pushState({ path: url }, '', url)
    },

    get() {
      return this.search && this.search.includes('q=') ? this.search.split('q=')[1] : undefined
    }
  })
}