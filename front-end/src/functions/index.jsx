export function formatarValorMonetario(valorProduto) {
    var valorFormatado = valorProduto.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    return valorFormatado
}