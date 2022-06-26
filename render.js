/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

class Display {
    constructor(game) {
        this.configs = game.configs
        this.canvas = document.getElementById('game')
        this.canvas.width = this.configs.x * this.configs.images.newWidth
        this.canvas.height = this.configs.y * this.configs.images.newHeight
        this.context = this.canvas.getContext('2d')
        this.scoreElement = document.getElementById('score')
    }
    render(game) {
        const { snake, pointCoordinate, score } = game

        for (let i = 0; i < this.configs.x; i++) {
            for (let j = 0; j < this.configs.y; j++) {
                this.drawEmptyPixel(i, j)
            }
        }

        this.drawImage(pointCoordinate, this.images.point)
        snake.coordinates.forEach(el => this.drawImage(el, this.images.snakeBody))
        //this.drawImage(snake.coordinates[0], this.images.snakeHead)
        this.scoreElement.innerHTML = score
    }

    drawEmptyPixel(x, y) {
        const { newWidth, newHeight } = this.configs.images

        this.context.fillStyle = '#000000'
        this.context.fillRect(x * newWidth, y * newHeight, newWidth, newHeight)
        this.context.strokeStyle = '#4F4F4F'
        this.context.strokeRect(x * newWidth, y * newHeight, newWidth, newHeight)

    }

    drawImage([x, y], image) {
        const { width, height, newWidth, newHeight } = this.configs.images
        this.context.drawImage(image, 0, 0, width, height, x * newWidth, y * newHeight, newWidth, newHeight)
    }

    async loadImages() {
        this.images = {
            point: new Image(),
            snakeHead: new Image(),
            snakeBody: new Image()
        }

        this.images.point.src = './images/point.png'
        this.images.snakeHead.src = './images/snake-head.png'
        this.images.snakeBody.src = './images/snake-body.png'

        return new Promise((resolve) => {
            let imagesLoaded = 0
            const imageNames = Object.keys(this.images)

            for (let i = 0; i < imageNames.length; i++) {
                const key = imageNames[i]
                this.images[key].addEventListener('load', () => {
                    imagesLoaded++
                    if (imagesLoaded === imageNames.length) return resolve()
                })
            }
        })
    }
}
