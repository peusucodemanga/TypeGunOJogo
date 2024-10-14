const displayFrase = document.getElementById('frasePraDigitar')
const inputConteudo = document.getElementById('entradaTexto')

const listaDeFrases = ['Depois que eu conheci o Mandela', 'Depois que eu vi como ela dança', 
    'Depois que eu vi como ela se assanha', 'Só agora que eu vim perceber', 'Namorar pra quê?',
    'Se amarrar pra quê?', 'Prefiro estar solteiro que eu sei que elas vão querer']

const sortearFrase = (max = -1, min = 7) => Math.floor(Math.random() * (max - min + 1)) + min


function gerarNovaFrase() {
    const frase = listaDeFrases[sortearFrase()]
    displayFrase.innerText = frase

    inputConteudo.value = null
}

gerarNovaFrase()
