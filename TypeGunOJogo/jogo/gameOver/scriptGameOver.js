const ganhouOuPerdeuValor = sessionStorage.getItem('ganhou?')
const tempoSobrevividoValor = sessionStorage.getItem('tempoSobrevivido')
const palavrasAcertadasValor = sessionStorage.getItem('palavrasAcertadas')
const palavrasErradasValor = sessionStorage.getItem('palavrasErradas')
const frasesConcluidasValor = sessionStorage.getItem('frasesConcluídas')//Aqui eu pego as no armazenamento quanto de casa coisa foi usado, ou sinalizado que foi usado nesse caso.

const ganhouOuPerdeu = document.getElementById('ganhouOuPerdeu')
const tempoSobrevivido = document.getElementById('tempoSobrevivido')
const palavrasAcertadas = document.getElementById('palavrasAcertadas')
const palavrasErradas = document.getElementById('palavrasErradas')
const frasesConcluidas = document.getElementById('frasesConcluidas')    //Pegando todas as funçãos e nomeando

//Mensagens diferentes se você ganhou ou perdeu
if (ganhouOuPerdeuValor === 'sim') {
    ganhouOuPerdeu.innerText = 'Parabéns! Você ganhou!'
}
else {
    ganhouOuPerdeu.innerText = 'Que pena! Você perdeu!'
}

//Aqui é apenas uma organização da mensagem de texto dessa página
tempoSobrevivido.innerText = `Você sobreviveu por ${tempoSobrevividoValor-1} segundos.`

palavrasAcertadas.innerText = `Você acertou ${palavrasAcertadasValor} palavras.`

palavrasErradas.innerText = `Você errou ${palavrasErradasValor} palavras.`

frasesConcluidas.innerText = `Você concluiu ${frasesConcluidasValor/2} frases.`