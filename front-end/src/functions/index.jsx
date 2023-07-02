export function converteValorInteiroParaValorMonetario(valor) {
  var valorFormatado = valor?.toFixed(2)?.replace(".", ",")?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  return valorFormatado
}

export function verificaTamanhoStringParaSubstituirPorTresPontos(string) {
  if (string.length > 31) {
    return string.slice(0, 31 - 3) + '...'
  }
  return string
}

export function ordenarListaPorChaveNumerica(array, key) {
  return array.sort((a, b) => a[key] - b[key])
}


export function converteImagemParaBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
  
    reader.onload = () => {
      resolve(reader.result)
    }
    
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function recortaTextoParaExibirCompactado(texto, limite) {
  if (texto.length <= limite) {
    return texto;
  } else {
    return texto.slice(0, limite) + "...";
  }
}