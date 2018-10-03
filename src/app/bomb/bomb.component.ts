import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { BombDetectionService } from "../board/bomb-detection.service";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: "bomb",
  templateUrl: "./bomb.component.html",
  styleUrls: ["./bomb.component.scss"]
})

export class BombComponent implements OnChanges {
  visibility:Boolean
  flag:Boolean
  subscription : Subscription;
  flag_path: any;
  bomb_path: any;
  isPlaying: Boolean;

  constructor(private bombDetectionService: BombDetectionService) {
    this.visibility = false;
    this.flag = false;
    this.subscription = bombDetectionService.revealAllBombs$.subscribe(
        revealAll => {
            this.visibility = true;
            this.changeVisibleTotal(true);
        }
    )
    this.flag_path = "http://nsm08.casimages.com/img/2016/12/06//16120609211022401014689211.png";
    this.bomb_path = "http://nsm08.casimages.com/img/2016/12/06//16120609211022401014689210.png";
    this.isPlaying = true;
  }

  ngOnChanges(change: SimpleChanges){
    if(this.gameSituation=="Playing"){
        this.isPlaying = true;
    } else {
        this.isPlaying = false;
    }
  }

  onClick(event){
    if(this.flagMode){
      this.flag = true;
      this.changeTotalBombValue(true);
      this.changeVisibleTotal(true);
    } else {
      this.bombDetectionService.bombClick(true);
    }
  }

  removeFlag(event){
    this.flag = false;
    this.changeTotalBombValue(false);
    this.changeVisibleTotal(false);
  }

  changeTotalBombValue(flag_placed: boolean){
    this.bombTotal.emit(flag_placed);
  }

  changeVisibleTotal(visible: boolean){
    this.invisibleNumberChange.emit(visible);
  }

  @Input() value: any;
  @Input() flagMode: any;
  @Input() gameSituation: any;
  @Output() bombTotal = new EventEmitter<boolean>();
  @Output() invisibleNumberChange = new EventEmitter<boolean>();
}
