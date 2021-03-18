import { Component, OnInit } from '@angular/core';

enum GraphType {
  Graph_2D,
  Graph_3D
}

@Component({
  selector: 'app-configure-graph',
  templateUrl: './configure-graph.component.html',
  styleUrls: ['./configure-graph.component.scss']
})
export class ConfigureGraphComponent implements OnInit {

  public selectedGraph: number = GraphType.Graph_3D;

  public attributes: string[] = ["att 1","att 2","att 3", "att 4"];

  private numAttrSelected: number = 0;
  private attrsSelected: boolean[];
  private disabledCheckboxes: boolean[];

  constructor() {
    this.attrsSelected = new Array(this.attributes.length);
    this.disabledCheckboxes = new Array(this.attributes.length);
    for(let i = 0; i < this.attributes.length; i++){
      this.disabledCheckboxes[i] = true;
    }
  }

  ngOnInit(): void {
  }

  graphSelect(event){

    console.log("hello:",(this.selectedGraph == GraphType.Graph_3D))

    this.numAttrSelected = 0;

    for(let i = 0; i < this.attributes.length; i++){
      this.disabledCheckboxes[i] = false;
      this.attrsSelected[i] = false;
    }
  }

  attrChecked(event) {
    if(event){
      this.numAttrSelected++;
      //if this is the 2nd/3rd attribute selected, then disable the other boxes
      if( this.selectedGraph == GraphType.Graph_2D ){
        if( this.numAttrSelected == 2 ){
          this.disableUncheckedBoxes(true);
        }
      } else if ( this.selectedGraph == GraphType.Graph_3D ){
        if( this.numAttrSelected == 3 ){
          this.disableUncheckedBoxes(true);
        }
      }
    } else {
      this.numAttrSelected--;

      //if this is the 2nd/3rd attribute selected, then enable all boxes
      if( this.selectedGraph == GraphType.Graph_2D ){
        if( this.numAttrSelected == 1 ){
          this.disableUncheckedBoxes(false);
        }
      } else if ( this.selectedGraph == GraphType.Graph_3D ){
        if( this.numAttrSelected == 2 ){
          this.disableUncheckedBoxes(false);
        }
      }
    }
  }

  disableUncheckedBoxes(disable: boolean): void {
    if(disable){
      for(let i = 0; i < this.attrsSelected.length; i++){
        this.disabledCheckboxes[i] = !this.attrsSelected[i];
      }
    } else {
      //enable
      for(let i = 0; i < this.disabledCheckboxes.length; i++){
        this.disabledCheckboxes[i] = false;
      }
    }
  }
}
