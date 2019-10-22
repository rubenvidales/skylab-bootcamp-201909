class ResultItem extends Component {
  constructor(container) {
    super(container)
    container.innerHTML = ''
  }

  onClick() { return undefined }

  render(result) {
    const img = document.createElement('img')
    const h1 = document.createElement('h1')
    const p = document.createElement('p')

    h1.classList.add('duck__title')
    img.classList.add('duck__image')
    p.classList.add('duck__button')

    img.src = result.imageUrl
    h1.innerHTML = result.title
    p.innerHTML = result.price

    this.container.append(h1, img, p)

    img.addEventListener('click', () => {
      const id = result.id
      this.onClick(id)
    })
  }
}
