import { SVG_NS } from "../settings";
import { runInThisContext } from "vm";
import { CLIENT_RENEG_LIMIT } from "tls";
import pingSound from "../../public/sounds/pong-01.wav";


export default class Ball {
  constructor(radius, boardWidth, boardHeight, colour = 'white') {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.colour = colour;
    this.ping = new Audio(pingSound)

    this.reset()
  }

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    this.vy = 0
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }

    // console.log("vy", this.vy);
    this.vx = this.direction * (6 - Math.abs(this.vy));
    // console.log("vx", this.vx);
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft || hitRight) {
      this.vx *= -1;
    }
    else if (hitTop || hitBottom) {
      this.vy *= -1;
    }

  }

  paddleCollision(player1, player2) {
    //moving right
    if (this.vx > 0) {
      //collision detection for right paddle
      if (this.x + this.radius >= player2.x && // right edge of the ball is >= left edge of the paddle
        this.x + this.radius <= player2.x + player2.width && // right edge of the ball is <= right edge of the paddle
        (this.y >= player2.y && this.y <= player2.y + player2.height) // ball Y is >= paddle top Y and <= paddle bottom Y
      ) {
        this.vx *= -1;
        this.ping.play();


            let playerColour2 = player2.colour;
            player2.colour = 'green';
            //change colour
            setTimeout(function () {
              //reset the color
              player2.colour = playerColour2;
            }, 200);
            


      }

    } else {
      if (this.x - this.radius <= player1.x + player1.width && // right edge of the ball is >= left edge of the paddle
        this.x - this.radius >= player1.x && // right edge of the ball is <= right edge of the paddle
        (this.y >= player1.y && this.y <= player1.y + player1.height) // ball Y is >= paddle top Y and <= paddle bottom Y
      ) {
        this.vx *= -1;
        this.ping.play();


        let playerColour1 = player1.colour;
        player1.colour ='green';
        //change colour
        setTimeout (function(){
          //reset the color
          player1.colour = playerColour1;
        }, 200);



      }
    }
  }

  goal(player) {
    player.score++;
    this.reset();
    if (player.id === 1) {
      console.log ("Player " + `${player.id}`+ " score the point");
    }else if
    (player.id ===2) {
      console.log ("Player " + `${player.id}` + " score the point");
    }
  
  { 

  }

  }
  render(svg, player1, player2) {
    this.paddleCollision(player1, player2);
    this.x += this.vx;
    this.y += this.vy;
    this.wallCollision()
    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y);
    circle.setAttributeNS(null, 'fill', this.colour);
    svg.appendChild(circle);
    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;

    if (rightGoal) {

      this.goal(player1);
      this.direction = 1;
    } else if (leftGoal) {
      this.goal(player2);
      this.direction = -1;
    }


  }
}