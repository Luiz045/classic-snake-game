/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

class Controller {
    constructor(configs){
        this.configs = configs
        this.game = new Game(this.configs)
        this.listener = new Listener(this.game)
        this.gameScreen = new Display(this.game)
        this.running = false
        this.frame = 0
    }

    loop() {
        this.gameScreen.render(this.game)

        if (this.running) {
            if ((this.frame * this.configs.frequency) % this.game.speed === 0) {
                const command = this.listener.getCommand()
                this.game.updateGame(command)
            }
            this.frame++
            if (this.frame === 100000000) this.frame = 0
        }

        if (this.game.gameResult !== null) this.endGame()
    }

    endGame() {
        const message = this.game.gameResult ? 'You Win!' : 'Game Over!'
        alert(
            `
            ${message}
            Score: ${this.game.score}`
        )
        this.restart()
    }

    start() {
        this.running = !this.running

        if (!this.running) document.getElementById('start').src = './images/button-play.png'
        else document.getElementById('start').src = './images/button-pause.png'
    }

    restart() {
        this.frame = 0
        this.running = false
        document.getElementById('start').src = './images/button-play.png'
        this.game = new Game(this.configs)
    }
}
