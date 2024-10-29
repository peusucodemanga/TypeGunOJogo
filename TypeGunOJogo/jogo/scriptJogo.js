const displayFrase = document.getElementById('frasePraDigitar')
// displayFrase controlará o html e css da frase a ser digitada
const inputConteudo = document.getElementById('entradaTexto')
// inputConteudo controlará o html e css do espaço para digitar a frase
const relogio = document.getElementById('relogio')
// relogio controlará o html e css do relógio
const vidaFilha = document.getElementById('vidaFilhaRestante')
// vidaFilha controlará o html e css da vida da filha
const cemPorCentoVida = parseInt(window.getComputedStyle(vidaFilha).getPropertyValue('width'))
// será importante definir qual é o valor, em pixels, que representa 100% da vida, a vida cheia
const listaDeDados = {'ganhou?': 'sim', 'tempoSobrevivido': 0, 'palavrasAcertadas': 0, 'palavrasErradas': 0, 'frasesConcluídas': 0}
// listaDeDados armazenará todas as pontuações do jogo
const barulhoDeTiro = new Audio('./images/barulhoDeTiro.mp3');
const rodarBarulhoDeTiro = () => {
    if (barulhoDeTiro.paused) {
        barulhoDeTiro.play();
    }else{
        barulhoDeTiro.currentTime = 0
    }
}

const musicaDeFundo = new Audio('./images/musicaFundo-KevinMacLeod-8bitDungeonBoss.mp3')
const rodarMusicaDeFundo = () =>{
    musicaDeFundo.volume=0.5
    musicaDeFundo.play()

}
rodarMusicaDeFundo()

const calcularPorcentagemVida = (porcentagem) => 100*porcentagem/cemPorCentoVida
//serve para calcular qual porcentagem da barra de vida o valor em pixels representa

const acabouJogo = () => {
    sessionStorage.setItem('ganhou?', listaDeDados['ganhou?'])
    sessionStorage.setItem('tempoSobrevivido', listaDeDados['tempoSobrevivido'])
    sessionStorage.setItem('palavrasAcertadas', listaDeDados['palavrasAcertadas'])
    sessionStorage.setItem('palavrasErradas', listaDeDados['palavrasErradas'])
    sessionStorage.setItem('frasesConcluídas', listaDeDados['frasesConcluídas'])
    location.replace('gameOver/indexGameOver.html')
}
/* quando o jogo acabar, todos os valores de pontuação serão guardados em sessionStorage para que numa outra página javascript,
esses valores possam ser manipulados e exibidos. */


const diminuirVida = () => {
    const vidaAtual = calcularPorcentagemVida(parseInt(window.getComputedStyle(vidaFilha).getPropertyValue('width')))
    // vidaAtual receberá a porcentagem da barra de vida atual
    if ((vidaAtual - 0.1) < 0) {
        vidaFilha.style.width = '0%'
        listaDeDados['ganhou?'] = 'nao'
        acabouJogo()
    /*para evitar que a vida diminua para valores negativos, se a subtração resultar em um valor menor que 0, a vida terá valor 0,
    você perde e o jogo acaba */
}
    else {
        vidaFilha.style.width = `${vidaAtual - 0.1}%`
        
        if ((vidaAtual - 0.1) === 0) {
            listaDeDados['ganhou?'] = 'nao'
            acabouJogo()
        }
    }
    // a função diminuirVida() será chamada a cada 15 milissegundos, para diminuir 0.1% da barra de vida atual
}


const aumentarVida = () => {
    const vidaAtual = calcularPorcentagemVida(parseInt(window.getComputedStyle(vidaFilha).getPropertyValue('width')))
    vidaFilha.style.width = `${vidaAtual + 8}%`
}
// quando essa função é chamada, a barra de vida receberá um acréscimo.


inputConteudo.addEventListener('input', () => {   // sempre que algo for digitado no espaço para digitar, essa função será chamada
    const listaSpans = displayFrase.querySelectorAll('span')
    // listaSpans receberá todos os spans adicionados no local em que se exibe a frase a ser digitada
    const digitadoNoInput = inputConteudo.value.split('')
    // digitaNoInput receberá uma lista com todos os caracteres digitados no espaço para digitar frase
    const listaPalavrasDaFrase = displayFrase.innerText.split(' ')
    // listaPalavrasDaFrase receberá uma lista com todas as palavras da frase a ser digitada
    const listaDigitadoNoInput = listaPalavrasDaFrase.map((x) => '')
    /* listaDigitadoNoInput será uma lista com o mesmo número de elementos que a quantidade de palavras total a serem digitadas,
    mas todos os caracteres serão vazios */
    const digitadoNoInputPalavras = (inputConteudo.value.split(' ')).filter((x) => x !== '')
    // digitadoNoInputPalavras será uma lista em que as palavras digitadas formarão cada elemento da lista
    digitadoNoInputPalavras.map((palavra, acc) => {
        listaDigitadoNoInput[acc] = palavra 
        acc += 1
    })
    if (digitadoNoInput[digitadoNoInput.length-1] == ' ') { // se o último caractere digitado no input for espaço:
        listaPalavrasDaFrase.map((palavra, acc) => { // pra cada palavra da frase
            const temClasse = listaSpans[acc].className // descobre se o respectivo span tem alguma classe css
            if (temClasse !== '') { // se tiver classe css
                listaDigitadoNoInput[acc+1] = listaDigitadoNoInput[acc] /* o próximo elemento de listaDigitadoNoInput vai receber 
                o elemento anterior*/
            }
            else if (listaDigitadoNoInput[acc] == '') { /* caso o anterior não aconteça e caso tal elemento de listaDigitadoNoInput
                estiver vazio*/
                listaSpans[acc].classList.remove('correto')
                listaSpans[acc].classList.remove('incorreto')
                // vai remover qualquer classe css que o respectivo span tiver
            }
            else if (palavra === listaDigitadoNoInput[acc]) {
                listaSpans[acc].classList.add('correto')
                listaSpans[acc].classList.remove('incorreto')
                aumentarVida()
                listaDeDados['palavrasAcertadas'] += 1
                rodarBarulhoDeTiro()
                // se a palavra em questão for igual a que ela está comparando, a vida auemntará e a palavra ficará verde
            }
            else if (palavra !== listaDigitadoNoInput[acc]) {
                listaSpans[acc].classList.add('incorreto')
                listaSpans[acc].classList.remove('correto')
                diminuirVida()
                listaDeDados['palavrasErradas'] += 1
                // se não for igual, a vida diminui um pouco e a palavra fica errada
            }
        acc += 1
        inputConteudo.value = null // remove o que quer que esteja escrito no input
        if (listaDigitadoNoInput[listaDigitadoNoInput.length-1] !== '') {
            setTimeout(() => {
                listaDeDados['frasesConcluídas'] += 1
                gerarNovaFrase(listaDeFrases)
              }, 400);
        }
        // se o últio elemento não estiver vazio, ou seja, a frase foi completa, gere uma nova frase
        })
    }
})


const listaDeFrases = [
    'Depois que eu conheci o Mandela', 
    'Renda-se como eu me rendi Mergulhe no que você não conhece como eu mergulhei Não se preocupe em entender viver ultrapassa qualquer entendimento. -Lispector,C', 
    'A constituição de San Marino é considerada atualmente a mais antiga constituição sobrevivente de qualquer estado existente no mundo', 
    'O jogo Minecraft apesar de sua base de admiradores monstruosa é tido como de origem independente', 
    'A banda de nome "Gojira" foi a primeira banda de metal a se apresentar nos Jogos Olímpicos em 2024',
    'A estrutura base dos sites normalmente é feito com css, html e javascript',
    'Alan Turing e Ada Lovelace são tidos como os precursores da computação',
    'A regra dos 180 graus, é uma regra comumente usada em filmes para gravar conversas. A perspectiva do observador não muda mais que 180 graus do foco da cena',
    'Depende e se eu disser que não?',
    'Ao verme que primeiro roeu as frias carnes do meu cadáver dedico como saudosa lembrança estas memórias póstumas. -Machado de Assis',
    'A exposição na fotografia é a responsável pela captação da quantidade de luz que entra no sensor de uma câmera.',
    'A morte tem suas próprias regras. Somente quando se conhece e respeita a morte é que se pode realmente compreender o valor da vida. -Hu tao',
    'Baleia queria dormir. Acordaria feliz, num mundo cheio de preás. As crianças se espojariam com ela, num chiqueiro enorme. O mundo ficaria cheio de preás gordos',
    'O número de Pi é 3,14 1592 6535',
    "Suponha que f(x) é uma função contínua no intervalo fechado ab e derivável no intervalo aberto ab. Ou seja, existe um x em que f'(x)=0",
    'A identidade de Euler abordada nesse capítulo desse livro é tida como a equação mais bonita da matemática A representação é, euler elevado a i vezes pi +1=0',
    'Um robô não pode ferir uma pessoa, deve obedecer ordens dos humanos e deve proteger seu ser, desde que não entre em conflito com as leis anteriores',
    'As mitocôndrias teriam origem em bactérias fagocitadas, mantendo-se em simbiose com a célula hospedeira. Esta teoria tem o nome de endossimbionte',
    "Nego drama, entre o sucesso e a lama. -Racionais Mc's",
    'Para para para para para. -João Kleber',
    'Vou negando as aparências disfarçando as evidências mas pra que viver fingindo, se eu não posso enganar meu coração? Eu sei que te amo!',
    'Eu vou deixar de ser besta e arrumar uma mulher pra mim, eu vejo só os outros com a mulher nos braços, fazendo assim. -Manoel Gomes'
]
// lista de frases que serão usadas no jogo

const sortearFrase = (max = -1, min = 22) => Math.floor(Math.random() * (max - min + 1)) + min
// essa função sorteará um número entre 0 e 21, que representará os índices da lista de frases

const gerarNovaFrase = (listaDeFrases) => { 
    const frase = listaDeFrases[sortearFrase()] // frase receberá uma frase aleatória da lista de frases
    displayFrase.innerHTML = '' // o espaço para exibir a frase será limpo
    frase.split(' ').map((palavra) => { // a frase será dividia numa lista em que cada elemento é uma palvra diferente, e pra cada palavra:
        const spanPalavra = document.createElement('span') // um novo span será criado
        spanPalavra.innerText = `${palavra} ` // dentro desse span, a frase será inserida
        displayFrase.appendChild(spanPalavra)  // o span com a palavra será adicionado no html da frase sendo exibida
    })
    inputConteudo.value = null // o espaço para digitar a frase será limpo
}
//dividir cada palavra em spans diferentes será importante para saber se cada palavra individualmente foi digitada corretamente

gerarNovaFrase(listaDeFrases) // assim que a página inicia, uma nova frase já é gerada

const contagemRegressiva = (tempo) => { // aqui temos a função que fará o tempo decrescer de 60 a 0
    if (tempo > 9) { // se o relógio apresentar apenas um dígito, a posição do texto é uma
        relogio.classList.add('relogioMaiorQue9')
        relogio.classList.remove('relogioMenorQue9')
    }
    else {  // se o relógio apresentar dois dígitos, a posição do texto é outra
        relogio.classList.remove('relogioMaiorQue9')
        relogio.classList.add('relogioMenorQue9')
    }
    relogio.textContent = tempo; // o texto do elemento html 'relógio' receberá o valor de tempo
    listaDeDados['tempoSobrevivido'] += 1 // o tempo sobrevivido ganha mais um segundo
    if (tempo === 0) {acabouJogo()} // se o tempo chegar a 0, o jogo acaba
    if (tempo > 0) { 
      setTimeout
      (function() {
        contagemRegressiva(tempo - 1)}, 1000);}  // a cada 1 segundo, a função será chamada novamente, com o tempo com -1 segundo
  }
  
contagemRegressiva(60)  // a contagem regressiva será iniciada, com 60 segundos sendo o valor inicial

const percorreVida = () => { 
    setTimeout 
    (function() {
      diminuirVida() // a cada 15 milissegundos, a função diminuirVida() será chamada
      percorreVida()}, 15);} //a função percorreVida() será chamada novamente, assim, enquanto o código rodar, essa função rodará em loop.

percorreVida() //inicia-se o processo de loop.
