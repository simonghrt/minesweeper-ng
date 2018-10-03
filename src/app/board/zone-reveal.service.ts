import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ZoneRevealService{

    private blankSelected = new Subject<number>();
    private revealZone = new Subject<number>();

    blankSelected$ = this.blankSelected.asObservable();
    revealZone$ = this.revealZone.asObservable();

    zoneClick(zoneClick: number){
        this.blankSelected.next(zoneClick);
    }

    reveal(reveal: number){
        this.revealZone.next(reveal);
    }
}