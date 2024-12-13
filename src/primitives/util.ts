

export class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export type CardinalDirection = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type Direction = "HORIZONTAL" | "VERTICAL";

export class Velocity {
  #components: Record<Direction, number> = {
    HORIZONTAL: 0,
    VERTICAL: 0
  }
  maxSpeed: Record<CardinalDirection, number>;

  constructor(maxSpeed: Record<CardinalDirection, number>) {
    this.maxSpeed = maxSpeed;
  }

  get components(): Record<Direction, number> {
    return {
      HORIZONTAL: this.#components.HORIZONTAL,
      VERTICAL: this.#components.VERTICAL
    }
  }

  multiply(direction: Direction, k: number) {
    this.#components[direction] *= k;
    this.#clamp();
  }

  add(direction: CardinalDirection, speed: number) {
    let signedSpeed = speed;
    switch (direction) {
      case 'UP':
      case 'LEFT':
        signedSpeed *= -1;
        break;
    }
    switch (direction) {
      case 'UP':
      case 'DOWN':
        this.#components.VERTICAL += signedSpeed;
        break;
      case 'LEFT':
      case 'RIGHT':
        this.#components.HORIZONTAL += signedSpeed;
        break;
    }
    this.#clamp();
  }

  #clamp() {
    this.components.HORIZONTAL = Math.min(
      this.maxSpeed.RIGHT,
      Math.max(0 - this.maxSpeed.LEFT, this.components.HORIZONTAL)
    );
    this.components.VERTICAL = Math.min(
      this.maxSpeed.DOWN,
      Math.max(0 - this.maxSpeed.UP, this.components.VERTICAL)
    );
  }
}