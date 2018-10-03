import { Injectable } from "@angular/core";

@Injectable()
export class BoardDataService {
  private data: any;
  private bombs: any;
  private zones: any;

  constructor() {
    var largeur = 16;
    var hauteur = 16;
    var probaBomb = 0.15;
    var numberBomb = 40;
    this.bombs = [];
    this.zones = [];

    this.data = this.creationAllCases(largeur, hauteur, numberBomb);
  }

  public creationAllCases(largeur, hauteur, numberBomb): any {

    //On effectue un premier passage où on place les bombes
    var arr_bomb = this.bombPlacesNumber(largeur, hauteur, numberBomb);

    //On analyse maintenant les bombes aux alentours pour changer la valeur des cases
    var arr_val = this.caseValuesBombs(arr_bomb, this.bombs, largeur, hauteur);

    //On analyse afin de récupérer les zones de vides
    var arr_withzone = this.zoneValues(arr_val, largeur, hauteur);

    return arr_withzone;
  }

  public bombPlacesNumber(largeur, hauteur, numberBomb): any {

    var arr = this.getEmptyBoard(largeur, hauteur);

    for(var bomb = 0;bomb<numberBomb;bomb++){
        var coords = this.getEmptyPlace(arr, largeur, hauteur);
        var i = coords[0];
        var j = coords[1];
        arr[i][j].val = 9;
        this.bombs.push({haut:i, larg:j});
    }

    return arr;
  }

  public getEmptyPlace(arr, largeur, hauteur): any{
    var i = Math.floor(Math.random() * hauteur);
    var j = Math.floor(Math.random() * largeur);
    while(arr[i][j].val==9){
      i = Math.floor(Math.random() * hauteur);
      j = Math.floor(Math.random() * largeur);
    }
    return [i,j];
  }

  public getEmptyBoard(largeur, hauteur): any {
    var arr = [];

    for(var i=0;i<hauteur;i++){
      var columns = [];
      for(var j=0;j<largeur;j++){
        columns[j]={val:0,zone:0,visible:false};
      }
      arr[i]=columns;
    }
    //Problème avec la méthode fill de Array
    //arr[i] = Array(largeur).fill({val:0, zone: 0, visible:false});
    return arr;
  }

  public bombPlacesProba(largeur, hauteur, probaBomb): any {
    var arr = [];
    var bombs
    
    for(var i=0;i<hauteur;i++) {
      var columns = [];
      for(var j=0;j<largeur;j++) {
        var valRand = Math.random();
        columns[j]={val:0,zone:0,visible:false};
        if (valRand<probaBomb) {
          columns[j].val=9;
          this.bombs.push({haut:i, larg:j});
        }
      }
      arr[i]=columns;
    }
    return arr;
  }

  public caseValuesAll(arr, largeur, hauteur):any {

    for(var i=0;i<hauteur;i++) {
      for(var j=0;j<largeur;j++) {
        if(arr[i][j].val != 9) {
          for(var line=-1;line<2;line++) {
            for(var col=-1;col<2;col++) {
              if((line+i<0) || (line+i>=hauteur) || (col+j<0) || (col+j>=largeur)) {

              }
              else {
                if(arr[line+i][col+j].val==9) {
                arr[i][j].val++;
                }
              }
            }
          }
        }
      }
    }

    return arr;
  }

  public caseValuesBombs(arr, bombs, largeur, hauteur){
    bombs.map((bomb, index)=> {
      for(var line=-1;line<2;line++) {
        for(var col=-1;col<2;col++) {
          if(col!=0 || line!= 0){
            if((line+bomb.haut<0) || (line+bomb.haut>=hauteur) || (col+bomb.larg<0) || (col+bomb.larg>=largeur)) {
            } else {
              if(arr[bomb.haut+line][bomb.larg+col].val!=9){
                arr[bomb.haut+line][bomb.larg+col].val++;
              }           
            }
          }
        }
      }
    });
    return arr;
  }

  public zoneValues(arr, largeur, hauteur){ 
    var zoneId = 1;
    for(var i=0;i<hauteur;i++){
      for(var j=0;j<largeur;j++){
        if(arr[i][j].val==0 && arr[i][j].zone==0){
          arr = this.ExploreZone(arr, i, j, zoneId, largeur, hauteur);
          zoneId++;
        }
      }
    }

    return arr;
  }

  public ExploreZone(arr, i ,j, zoneId, largeur, hauteur): any {
    var val_to_explore = [];
    val_to_explore.push([i,j]);
    arr[i][j].zone = zoneId;
    while(val_to_explore.length>0){

      var coords = val_to_explore[0];
      val_to_explore.shift();
      var x = coords[0];
      var y = coords[1];
      
      for(var line=-1;line<2;line++){
        for(var col=-1;col<2;col++){
          if((line+x<0) || (line+x>=hauteur) || (col+y<0) || (col+y>=largeur)) {
          } else {
              if(arr[x+line][y+col].val!=0){
                arr[x+line][y+col].zone=zoneId;  
              }        
          }
        }
      }

      val_to_explore = this.NeighborCases(arr, val_to_explore, x, y, zoneId, largeur, hauteur);
    }

    return arr;
  }

  public NeighborCases(arr, val_to_explore, x, y, zoneId, largeur, hauteur): any {
      if((x-1)>=0){
        if(arr[x-1][y].val==0 && arr[x-1][y].zone==0){
          val_to_explore.push([x-1,y]);
          arr[x-1][y].zone = zoneId;
        }
      }
      if((y-1)>=0){
        if(arr[x][y-1].val==0 && arr[x][y-1].zone==0){
          val_to_explore.push([x,y-1]);
          arr[x][y-1].zone = zoneId;
        }
      }
      if((x+1)<hauteur){
        if(arr[x+1][y].val==0 && arr[x+1][y].zone==0){
          val_to_explore.push([x+1,y]);
          arr[x+1][y].zone = zoneId;
        }
      }
      if((y+1)<largeur){
        if(arr[x][y+1].val==0 && arr[x][y+1].zone==0){
          val_to_explore.push([x,y+1]);
          arr[x][y+1].zone = zoneId;
        }
      }

      return val_to_explore;
  }

  public getData(): any {
    return this.data;
  }

  public getBombs(): any {
    return this.bombs;
  }

  public getZones(): any {
    return this.zones;
  }
}
