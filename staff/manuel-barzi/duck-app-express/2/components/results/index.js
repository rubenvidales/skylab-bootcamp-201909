module.exports = function ({ items, onItemRender }) {
    return `<ul class="results">
        ${items.map(item => onItemRender(item)).join('')}
    </ul>`
}