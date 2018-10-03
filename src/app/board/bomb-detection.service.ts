import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BombDetectionService{

    private bombSelected = new Subject<boolean>();
    private revealAllBombs = new Subject<boolean>();

    bombSelected$ = this.bombSelected.asObservable();
    revealAllBombs$ = this.revealAllBombs.asObservable();

    bombClick(bombClick: boolean){
        this.bombSelected.next(bombClick);
    }

    revealAll(revealAll: boolean){
        this.revealAllBombs.next(revealAll);
    }
}