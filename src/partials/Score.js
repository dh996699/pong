import { SVG_NS } from "../settings";

export default class Score {
    constructor(x, y, size) {
      this.x = x; //location to display score
      this.y = y; //location to display score
      this.size = size;
    }
    render(svg, score) {

        let text = document.createElementNS(SVG_NS, 'text');
        text.setAttributeNS(null, 'x', this.x);
        text.setAttributeNS(null, 'y', this.y);
        text.setAttributeNS(null, 'font-family', "'silkscreen web'", 'monotype');
        text.setAttributeNS(null, 'size', this.size);
        text.setAttributeNS(null, 'winner', this.winner);
        text.setAttributeNS(null, 'loser', this.loser);
        text.setAttributeNS(null, 'fill', 'red');
        text.textContent = score;
        svg.appendChild(text);
        
      }

    }

