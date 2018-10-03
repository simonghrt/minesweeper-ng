import { Component } from "@angular/core";

@Component({
  selector: "game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent {
    flagMode:Boolean

    constructor(){
        this.flagMode=false;
    }

    toggleFlagMode(event){
        this.flagMode = !this.flagMode;        
    }

    newParty(event){
        window.location.reload();
    }
}
