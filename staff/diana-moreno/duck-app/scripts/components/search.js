class Search extends Component {
  constructor(container) {
    super(container)
  }

  set onSubmit(expression) {
    this.container.addEventListener('submit', function(event) {
      event.preventDefault()
      const query = this.query.value
      expression(query)
      viewList.show()
      viewSingle.hide()
    })
  }
}
