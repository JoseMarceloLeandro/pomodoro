const html = document.querySelector('html')
const contador = document.querySelector('.app__display')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarPausarBt = document.querySelector('#start-pause span')

const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true

const soundBeep = new Audio('/sons/beep.mp3')
const soundPause = new Audio('/sons/pause.mp3')
const soundPlay = new Audio('/sons/play.wav')

let tempoDecorridoEmSegundos = 5
let intervaloId = null
let varteste = null


function atualizarContador() {
    contador.innerHTML = tempoDecorridoEmSegundos;
    if (tempoDecorridoEmSegundos > 0) {
        tempoDecorridoEmSegundos--;
    }else{
        zerar()
        alert('Tempo Finalizado')
        
        return
    }
    
}


musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto' , contexto);
    banner.setAttribute('src' , `/imagens/${contexto}.png`)
    switch (contexto){
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break
        default:
            break;

    }
}


startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar () {
    if(intervaloId) {
        soundPause.play()
        iniciarOuPausarPausarBt.innerHTML = "Começar"
        zerar()
        return
    }
    soundPlay.play()
    intervaloId = setInterval(atualizarContador, 1000)
    iniciarOuPausarPausarBt.innerHTML = "Pausar"

}
function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
}
