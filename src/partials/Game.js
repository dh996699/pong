import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import { SVG_NS, KEYS, PaddleOption } from "../settings";
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

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
      KEYS.z 
    );

    this.player2 = new Paddle(
      this.height,
      PaddleOption.paddleWidth,
      PaddleOption.paddleHeight,
      (this.width - (PaddleOption.boardGap + PaddleOption.paddleWidth)),//update this line to be 10px from the right
      ((this.height - PaddleOption.paddleHeight) / 2),
      'red',
      KEYS. up, 
      KEYS.down
    );

    this.ball = new Ball (8, this.width, this.height, 'blue');
            
document.addEventListener('keydown', (event) => {
  switch(event.key){
    case KEYS.spaceBar:  
    this.pause = !this.pause;
    break;
  }
});


  }

      

  render() {
    if (this.pause){
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
    this.ball.render(svg);
  }
}