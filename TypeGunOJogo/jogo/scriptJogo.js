const displayFrase = document.getElementById('frasePraDigitar')
const inputConteudo = document.getElementById('entradaTexto')
const relogio = document.getElementById('relogio')

inputConteudo.addEventListener('input', () => {
    const listaSpans = displayFrase.querySelectorAll('span')
    const digitadoNoInput = inputConteudo.value.split('')
    const listaPalavrasDaFrase = displayFrase.innerText.split(' ')
    const listaDigitadoNoInput = listaPalavrasDaFrase.map((x) => '')
    const digitadoNoInputPalavras = (inputConteudo.value.split(' ')).filter((x) => x !== '')
    digitadoNoInputPalavras.map((palavra, acc) => {
        listaDigitadoNoInput[acc] = palavra
        acc += 1
    })
    if (digitadoNoInput[digitadoNoInput.length-1] == ' ') {
        listaPalavrasDaFrase.map((palavra, acc) => {
            const temClasse = listaSpans[acc].className
            if (temClasse !== '') {
                listaDigitadoNoInput[acc+1] = listaDigitadoNoInput[acc]
            }
            else if (listaDigitadoNoInput[acc] == '') {
                listaSpans[acc].classList.remove('correto')
                listaSpans[acc].classList.remove('incorreto')
            }
            else if (palavra === listaDigitadoNoInput[acc]) {
                listaSpans[acc].classList.add('correto')
                listaSpans[acc].classList.remove('incorreto')
            }
            else if (palavra !== listaDigitadoNoInput[acc]) {
                listaSpans[acc].classList.add('incorreto')
                listaSpans[acc].classList.remove('correto')
            }
        acc += 1
        inputConteudo.value = null
        })
    }
})

const listaDeFrases = ['Depois que eu conheci o Mandela', 'Depois que eu vi como ela dança', 
    'Depois que eu vi como ela se assanha', 'Só agora que eu vim perceber', 'Namorar pra quê?',
    'Se amarrar pra quê?', 'Prefiro estar solteiro que eu sei que elas vão querer']

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
    if (x > 9) {
        relogio.classList.add('relogioMaiorQue9')
        relogio.classList.remove('relogioMenorQue9')
    }
    else {
        relogio.classList.remove('relogioMaiorQue9')
        relogio.classList.add('relogioMenorQue9')
    }
    relogio.textContent = x;
    if (x > 0) {
      setTimeout
      (function() {
        contagemRegressiva(x - 1)}, 1000);} 
  }
  
contagemRegressiva(60)
