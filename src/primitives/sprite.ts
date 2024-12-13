import { type Direction, Position, Velocity } from "./util.js";

export class Sprite {
  position: Position;
  currentVelocity: Velocity;

  constructor(options: {
    maxSpeed: Velocity['maxSpeed'],
    initialPosition: {x: number, y: number}
  }) {
    this.currentVelocity = new Velocity(options.maxSpeed);
    this.position = new Position(
      options.initialPosition.x,
      options.initialPosition.y
    );
  }
  
  updateVelocity() {
    this.currentVelocity.multiply('HORIZONTAL', 0.9);
    if (this.currentVelocity.components.VERTICAL <= 0) {
      this.currentVelocity.multiply('VERTICAL', 0.9);
    }
  }
  
  updatePosition() {
    this.position.x += this.currentVelocity.components.HORIZONTAL;
    this.position.y += this.currentVelocity.components.VERTICAL;
    this.position.y = Math.max(this.position.y, 0);
    this.position.y = Math.min(this.position.y, 100);
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'rgb(255, 0, 0)';
    context.fillRect(this.position.x, this.position.y, 16, 16);
  }
}