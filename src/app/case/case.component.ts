import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { ZoneRevealService } from "../board/zone-reveal.service";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: "case",
  templateUrl: "./case.component.html",
  styleUrls: ["./case.component.scss"]
})

export class CaseComponent implements OnChanges {
  visibility: Boolean;
  flag: Boolean;
  subscription: Subscription;
  flag_path: any;
  isPlaying: Boolean;

  constructor(private zoneRevealService: ZoneRevealService) {
    this.visibility = false;
    this.flag = false;
    this.subscription = zoneRevealService.revealZone$.subscribe(
        reveal => {
            if(this.zone==reveal){
              if(this.visibility == false) {
                this.changeVisibleTotal(true);
              }
              this.visibility = true;
            }
        }
    )
    this.flag_path="http://nsm08.casimages.com/img/2016/12/06//16120609211022401014689211.png";
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
      this.visibility = true;
      this.changeVisibleTotal(true);
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
  @Input() zone:any;
  @Input() flagMode: any;
  @Input() gameSituation: any;
  @Output() bombTotal = new EventEmitter<boolean>();
  @Output() invisibleNumberChange = new EventEmitter<boolean>();
}
