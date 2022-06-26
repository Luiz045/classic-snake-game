/* eslint-disable no-undef */

const configs = {
    x: 16,
    y: 16,
    images: {
        width: 24,
        height: 24,
        newWidth: 30,
        newHeight: 30
    },
    acceptableMoves: ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'],
    frequency: 20,
    initialSpeed: 200
}

let controller

async function main() {
    controller = new Controller(configs)
    await controller.gameScreen.loadImages()
    setInterval(() => controller.loop(), controller.configs.frequency)
}

main()
