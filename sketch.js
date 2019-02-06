let outer = [];
let inner = [];
let r = 200;
let Delta_r = 5;
let T = 0.000001;

function setup() {
	createCanvas(500, 500);

    for (let a = 0; a < TWO_PI; a += 0.05) {
        let x = r * cos(a);
        let y = r * sin(a);
        outer.push(new Particle(x, y, false));
    }

    for (let i = 0; i < 1; i++) {
        let rand_r = random(0, r - Delta_r);
        let rand_a = random(0, TWO_PI);
        let x = rand_r * cos(rand_a);
        let y = rand_r * sin(rand_a);
        inner.push(new Particle(x, y, true));
    }
}

function draw() {
    background(255);
    translate(width/2, height/2);
    stroke(0);
    line(0, -height/2, 0, height/2);
    line(-width/2, 0, width/2, 0);

    for (let i = 0; i < inner.length; i++) {
        let particle = random(inner);
        metropolis(particle);
    }

    for (let i = 0; i < outer.length; i++) {
        outer[i].show();
    }

    for (let i = 0; i < inner.length; i++) {
        inner[i].show();
    }
}

function energy(particle) {
    let total = 0.0;
    for (let j = 0; j < outer.length; j++) {
        let r = p5.Vector.dist(outer[j].pos, particle.pos);
        total += 1 / r;
    }
    for (let k = 0; k < inner.length; k++) {
        if (inner[k] != particle) {
            let r = p5.Vector.dist(inner[k].pos, particle.pos);
            total += 1 / r;
        }
    }
    return total;
}

function metropolis(particle) {
    let Uold = energy(particle);
    let dr = p5.Vector.random2D();
    dr.setMag(Delta_r);
    particle.pos.add(dr);
    let Unew = energy(particle);
    let Delta_U = Unew - Uold;
    if (exp(-Delta_U / T) < random()) {
        particle.pos.sub(dr);
    }
}
