import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
// import Score from './Winner';
import { SVG_NS, KEYS, PaddleOption } from "../settings";

export default class Game {

  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);


    this.player1 = new Paddle(
      this.height,
      PaddleOption.paddleWidth,
      PaddleOption.paddleHeight,
      PaddleOption.boardGap,
      ((this.height - PaddleOption.paddleHeight) / 2),
      'yellow',
      KEYS.a,
      KEYS.z,
      1
    );

    this.player2 = new Paddle(
      this.height,
      PaddleOption.paddleWidth,
      PaddleOption.paddleHeight,
      (this.width - (PaddleOption.boardGap + PaddleOption.paddleWidth)),//update this line to be 10px from the right
      ((this.height - PaddleOption.paddleHeight) / 2),
      'red',
      KEYS.up,
      KEYS.down,
      2
    );

    this.ball = new Ball(8, this.width, this.height, 'white');
    this.score1= new Score(this.width /2 - 50, 30, 30);
    this.score2= new Score(this.width /2 + 50, 30, 30);
    // this.winner= new Score(this.width /2 + this.height/2, 30, 30, "winner");

    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause;
          break;
      }
    });

    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case KEYS.r:
          window.location.reload(true);
      }
    });
    

  }

  render() {
    if (this.pause) {
      return;
    }
    this.gameElement.innerHTML = ''; // clear the html before appending to fix a render bug 🐞
    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);
    this.board.render(svg);
    this.player1.render(svg);
    this.player2.render(svg);
    this.ball.render(svg, this.player1, this.player2);
    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);
    
  }
}