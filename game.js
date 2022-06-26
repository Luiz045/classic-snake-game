/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
class Snake {
    constructor(bx, by) {
        const ix = parseInt(bx/2, 10)
        const iy = parseInt(by/2, 10)

        this.coordinates = [[ix, iy], [ix +1, iy]]
        this.direction = 'ArrowLeft'
        this.length = 2
        this.moveFunctions = {
            'ArrowDown': ([x, y]) => [x, y + 1],
            'ArrowUp': ([x, y]) => [x, y - 1],
            'ArrowLeft': ([x, y]) => [x - 1, y],
            'ArrowRight': ([x, y]) => [x + 1, y]
        }
    }

    move(append=false) {
        const firstPosition = this.coordinates[0]

        this.coordinates.unshift(this.moveFunctions[this.direction](firstPosition))
        if (!append) this.coordinates.pop()
    }

    getDirection(command) {
        if (!command) return this.direction
        const forbiddenChanges = [['ArrowDown', 'ArrowUp'], ['ArrowLeft', 'ArrowRight']]

        const commandIsInvalid = forbiddenChanges.find(el => el.includes(command) && el.includes(this.direction))
        return commandIsInvalid ? this.direction : command
    }

    moveAndAppend() {
        this.move(true)
        this.length ++
    }

    pop() {
        this.coordinates.pop()
        this.length --
    }
}

class Game {
    constructor(configs) {
        this.configs = configs
        this.snake = new Snake(configs.x, configs.y)
        this.pointCoordinate = this.createNewPoint(this.snake)
        this.speed = this.configs.initialSpeed
        this.score = 0
        this.gameResult = null
    }

    createNewPoint() {
        let pointCoordinate

        do {
            pointCoordinate = []
            pointCoordinate.push(parseInt(Math.random() * this.configs.x, 10))
            pointCoordinate.push(parseInt(Math.random() * this.configs.y, 10))
        } while(this.snakeIncludes(pointCoordinate))

        return pointCoordinate
    }
    updateGame(command) {
        this.snake.direction = this.snake.getDirection(command)

        const [sx, sy] = this.snake.coordinates[0]
        const [px, py] = this.pointCoordinate

        if (sx === px && sy === py) {
            this.snake.moveAndAppend()
            this.pointCoordinate = this.createNewPoint()
            this.score ++
            if (this.speed > 20 && this.score % 10 === 0) this.speed -= 20
        } else this.snake.move()

        this.gameResult = this.checkEndGame()
    }

    checkEndGame() {
        const { x, y } = this.configs
        const [sx, sy] = this.snake.coordinates[0]

        if (this.snake.length === x * y) return true
        if (this.snakeIncludes([sx, sy], true) || (sx < 0 || sx >= x || sy < 0 || sy >= y))
            return false
        return null
    }

    snakeIncludes([x, y], ignoreFirstPosition=false) {
        return this.snake.coordinates.find((el, i) => {
            if (!ignoreFirstPosition || i !== 0)
                if(el[0] === x && el[1] === y)
                    return true
        })
    }
}
