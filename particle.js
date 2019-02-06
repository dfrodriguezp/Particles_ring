class Particle {
    constructor(x, y, move) {
        this.pos = createVector(x, y);
        this.move = move;
    }

    show() {
        if (this.move)
            fill(255, 0, 0);
        else
            fill(0, 0, 255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, 5, 5);
    }
}