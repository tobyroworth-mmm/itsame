import { sprites } from "../engine/run.js";
import { Sprite } from "../primitives/sprite.js";

const alma = new Sprite({
    maxSpeed: {
        UP: 5,
        DOWN: 10,
        LEFT: 5,
        RIGHT: 5
    },
    initialPosition: {
        x: 0,
        y: 100
    }
});

alma.currentVelocity.add('RIGHT', 1);

sprites.add(alma);

addEventListener('keydown', (e: KeyboardEvent) => {
    switch (e.key) {
        case 'ArrowDown':
            alma.currentVelocity.add('DOWN', 1);
            break;
        case 'ArrowUp':
            alma.currentVelocity.add('UP', 10);
            break;
        case 'ArrowLeft':
            alma.currentVelocity.add('LEFT', 5);
            break;
        case 'ArrowRight':
            alma.currentVelocity.add('RIGHT', 5);
            break;
    }
});