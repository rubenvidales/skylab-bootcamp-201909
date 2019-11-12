module.exports = function ({ items, onItemRender }){
    return `<ul class="results__list">
        ${items.map(item => onItemRender(item)).join('')}
    </ul>`
}