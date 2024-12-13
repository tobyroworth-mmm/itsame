import { Sprite } from "../primitives/sprite.js"

export const sprites = new Set<Sprite>();

const GRAVITY = 0.01;

const applyGravity = () => {
    for (let sprite of sprites) {
        sprite.currentVelocity.add('DOWN', GRAVITY);
    }
}

export const runTick = () => {
    applyGravity();
    for (let sprite of sprites) {
        sprite.updateVelocity();
        sprite.updatePosition();
    }
}

export const runFrame = (context: CanvasRenderingContext2D) => {
    context.fillStyle = 'rgb(0,0,0)';
    context.fillRect(0, 0, 394, 394);
    context.fillStyle = 'rgb(0,128,0)';
    context.fillRect(0, 108, 394, 394);
    for (let sprite of sprites) {
        sprite.draw(context);
    }
}

export const start = (context: CanvasRenderingContext2D, updateRate: number) => {
    setInterval(() => {
        runTick();
    }, updateRate);
    const service = () => {
        runFrame(context);
        requestAnimationFrame(service);
    }
    service();
}