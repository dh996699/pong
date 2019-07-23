import { SVG_NS } from "../settings";

export default class {
    constructor(winner, loser, draw) {
      this.winner = winner; //location to display score
      this.loser = loser; //location to display score
      this.draw = draw;
    
    }
    render(svg, winner) {

        let text = document.createElementNS(SVG_NS, 'text');
        text.setAttributeNS(null, 'font-family', "'silkscreen web'", 'monotype');
        text.setAttributeNS(null, 'winner', this.winner);
        text.setAttributeNS(null, 'loser', this.loser);
        text.setAttributeNS(null, 'draw', this.draw);
        text.textContent = score;
        svg.appendChild(text);
        
      }

    }