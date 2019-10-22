class Results extends Component {
  constructor(container) {
    super(container)
    container.innerHTML = ''
  }

  onItemRender() { undefined }

  render(results) {
    this.container.innerHTML = ''

    results.forEach(result => {
      const item = this.onItemRender()
      item.render(result)
      this.add(item)
    })
  }
}
