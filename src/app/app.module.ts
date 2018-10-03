import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { BoardComponent } from "./board/board.component";
import { CaseComponent } from "./case/case.component";
import { BlankComponent} from './blank/blank.component';
import { BombComponent} from './bomb/bomb.component';
import { GameComponent} from './game/game.component';
import { BoardDataService } from "./board/board-data.service";
import { BombDetectionService } from './board/bomb-detection.service';
import { ZoneRevealService } from './board/zone-reveal.service';

@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    BoardComponent,
    CaseComponent,
    BombComponent,
    BlankComponent,
    GameComponent
  ],
  // Entry Components
  entryComponents: [
    AppComponent
  ],
  // Providers
  providers: [
    BoardDataService,
    BombDetectionService,
    ZoneRevealService
  ],
  // Modules
  imports: [
    BrowserModule
  ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {

  }
}
