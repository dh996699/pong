import { SVG_NS, KEYS } from "../settings";

export default class Paddle {
  constructor(boardHeight, width, height, x, y, colour = 'white', upKey, downKey, id) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 20;
    this.score = 0;
    this.colour = colour;
    this.upKey = upKey;
    this.downKey = downKey;
    this.id = id;

    this.keyState = {};

    document.addEventListener("keydown", event => {
      this.keyState[event.key] = true;
    });

    document.addEventListener("keyup", event => {
      this.keyState[event.key] = false;
    });

  }
  
  up(){

    // this.y = this.y - this.speed;
    this.y = Math.max (0, this.y - this.speed);
    //-1 is less than 0 so the max value is always returned 

  }
  

down(){
  // this.y = this.y + this.speed;
  this.y = Math.min (this.boardHeight - this.height, this.y + this.speed);


}

  render(svg) {

if(this.keyState[KEYS.a] && this.upKey ===  KEYS.a){
  this.up()
}

  if(this.keyState[KEYS.z] && this.downKey ===  KEYS.z){
    this.down()
  }
    if(this.keyState[KEYS.up] && this.upKey ===  KEYS.up){
      this.up()
    }
      if(this.keyState[KEYS.down] && this.downKey ===  KEYS.down){
        this.down()

      }

        let rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttributeNS(null, 'fill', this.colour);
        rect.setAttributeNS(null, 'width', this.width);
        rect.setAttributeNS(null, 'height', this.height);
        rect.setAttributeNS(null, 'x', this.x);
        rect.setAttributeNS(null, 'y', this.y);

        

        svg.appendChild(rect);
    }
  }