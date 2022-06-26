/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

class Listener {
    constructor(game) {
        this.configs = game.configs
        this.command = ''
        const clickableElement = document.getElementsByClassName('clickableElement')

        for (let i = 0; i < clickableElement.length; i++) {
            clickableElement[i].addEventListener('click', function () {
                this.blur()
            })
        }

        document.addEventListener('keydown', (event) => this.registerEvent(event))
    }

    registerEvent(event) {
        const index = this.configs.acceptableMoves.indexOf(event.key === ' ' ? event.code : event.key)
        if (index !== -1) this.command = this.configs.acceptableMoves[index]
    }

    getCommand() {
        let response = ''

        if (this.command) {
            response = this.command
            this.command = ''
        }

        return response
    }
}
