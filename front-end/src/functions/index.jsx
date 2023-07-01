export function converteValorInteiroParaValorMonetario(valor) {
    var valorFormatado = valor.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    return valorFormatado
}

export function verificaTamanhoStringParaSubstituirPorTresPontos(string) {
    if (string.length > 31) {
      return string.slice(0, 31 - 3) + '...';
    }
    return string;
  }