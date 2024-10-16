const displayFrase = document.getElementById('frasePraDigitar')
const inputConteudo = document.getElementById('entradaTexto')

inputConteudo.addEventListener('input', () => {
    const digitadoNoInput = inputConteudo.value.split('')
    const digitadoNoInputPalavras = inputConteudo.value.split(' ')
    const listaPalavrasDaFrase = displayFrase.innerText.split(' ')
    if (digitadoNoInput[digitadoNoInput.length-1] == ' ') {
        listaPalavrasDaFrase.map((palavra, acc) => {
            if (digitadoNoInputPalavras[acc] == null) {
                console.log('ainda nao foi digitado')
            }
            else if (palavra === digitadoNoInputPalavras[acc]) {
                console.log('correto')
            }
            else if (palavra !== digitadoNoInputPalavras[acc]) {console.log('incorreto')}
        acc += 1
        })
    }
})

const listaDeFrases = ['Depois que eu conheci o Mandela', 'Depois que eu vi como ela dança', 
    'Depois que eu vi como ela se assanha', 'Só agora que eu vim perceber', 'Namorar pra quê?',
    'Se amarrar pra quê?', 'Prefiro estar solteiro que eu sei que elas \nvão querer']

const sortearFrase = (max = -1, min = 7) => Math.floor(Math.random() * (max - min + 1)) + min


function gerarNovaFrase() {
    const frase = listaDeFrases[sortearFrase()]
    displayFrase.innerHTML = ''
    frase.split(' ').map((palavra) => {
        const spanPalavra = document.createElement('span')
        spanPalavra.innerText = `${palavra} `
        displayFrase.appendChild(spanPalavra)
    })
    inputConteudo.value = null
}

gerarNovaFrase()

function contagemRegressiva(x) {
    document.getElementById('relogio').textContent=x;
    if (x > 0) {
      setTimeout
      (function() {
        contagemRegressiva(x - 1)}, 1000);} 
  }
  
contagemRegressiva(60)
