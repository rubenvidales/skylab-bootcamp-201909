class Results extends Component {
    constructor(container) {
        super(container)
        container.innerHTML = ''
    }

   onItemRender() {} //lo machacaremos en la instancia

   render(results) {
       
        this.container.innerHTML = ''

        results.forEach(function (result) {
            var item = this.onItemRender()
            item.render(result)

        this.add(item)
    }.bind(this))
   }
}





// Results.prototype.onItemRender = undefined

// Results.prototype.render = function (results) {
//     this.container.innerHTML = ''

//     results.forEach(function (result) {
//         var item = this.onItemRender()

//         item.render(result)

//         this.add(item)
//     }.bind(this))
// }