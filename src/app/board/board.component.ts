import { Component, OnInit, Input } from "@angular/core";
import { BoardDataService } from "./board-data.service";
import { BombDetectionService } from "./bomb-detection.service";
import { ZoneRevealService } from "./zone-reveal.service";

@Component({
  selector: "board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"],
  providers: [BombDetectionService]
})
export class BoardComponent implements OnInit {
  data: any;
  rows: any;
  bombs: any;
  zones: any;
  bombsRemaining: any;
  time: any;
  intervalTime: any;
  game_situation: any;
  numberInvisible: any;
  width: any;
  bomb_path: any;
  time_path: any;

  constructor(private boardDataService: BoardDataService, private bombDetectionService: BombDetectionService, private zoneRevealService: ZoneRevealService) {
      bombDetectionService.bombSelected$.subscribe(
          bombClick => {
              this.revealBombs();
          }
      );

      zoneRevealService.blankSelected$.subscribe(
          zoneClick => {
              this.revealZone(zoneClick);
          }
      );
      this.time = 0;
      this.intervalTime = window.setInterval(() => {
          this.time++;
      },1000);
      this.game_situation="Playing";
      this.bomb_path="http://nsm08.casimages.com/img/2016/12/07//16120712430322401014689546.png";
      this.time_path="http://nsm08.casimages.com/img/2016/12/07//16120712430322401014689547.png";
  }

  clearTimer() {
      clearInterval(this.intervalTime);
  }

  revealBombs() {
      this.bombDetectionService.revealAll(true);
      this.clearTimer();
      this.game_situation="Losing";
  }

  invisibleNumberChange(visible: boolean) {
      if(visible){
          this.numberInvisible--;
      } else {
          this.numberInvisible++;
      }
      this.winner();
  }

  winner() {
      if(this.game_situation!="Losing" && this.bombsRemaining==0 && this.numberInvisible==0){
          this.clearTimer();
          this.game_situation="Winning";
      }
  }

  revealZone(zoneClick) {
      this.zoneRevealService.reveal(zoneClick);
  }

  ngOnInit() {
    this.data = this.boardDataService.getData();
    this.bombs = this.boardDataService.getBombs();
    this.zones = this.boardDataService.getZones();
    this.bombsRemaining= this.bombs.length;
    var hauteur = this.data.length;
    var haut = [];
    for(var i=0; i<hauteur;i++) {
        haut[i] = i;
    }
    this.rows = haut;
    this.numberInvisible = this.data.length * this.data[0].length;
    this.width = 20 * this.data[0].length +"px";
  }

  bombTotal(flag_placed: boolean){
    if(flag_placed){
        this.bombsRemaining--;
    }
    else {
        this.bombsRemaining++;
    }
  }

  @Input() flagMode: any;
}
