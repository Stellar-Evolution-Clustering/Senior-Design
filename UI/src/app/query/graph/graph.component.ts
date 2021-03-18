import { Component, OnInit } from '@angular/core';
import { QueryService } from '../../api/query.service';
import { ClusteredData } from './clusteredData';
import { ConfigureGraphComponent } from './configure-graph/configure-graph.component';

import * as Plotly from 'plotly.js/dist/plotly.js';
import { MatDialog } from '@angular/material/dialog';

// PlotlyModule.plotlyjs = Plotly;

//TODO: Loading screen during query, or hide 2d graph while loading

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  public graph;
  public graph3D;
  selectedCluster: string;

  private data3D: any;
  private clusteredData: ClusteredData;

  constructor(
    private queryService: QueryService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.selectedCluster = "all";
    console.log(this.selectedCluster);
    this.data3D = null;
    this.graph = {
          data: null,
          layout: {width: 640, height: 480, title: 'A 2D graph'}
    };
    this.graph3D = {
          data: this.data3D,
          layout: {
            autosize: true,
            height: 480,
            scene: {
                aspectratio: {
                    x: 1,
                    y: 1,
                    z: 1
                },
                camera: {
                    center: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    eye: {
                        x: 1.25,
                        y: 1.25,
                        z: 1.25
                    },
                    up: {
                        x: 0,
                        y: 0,
                        z: 1
                    }
                },
                xaxis: {
                    title: 'mass_diff',
                    type: 'linear',
                    zeroline: false,
                },
                yaxis: {
                    title: 'lumin_diff',
                    type: 'linear',
                    zeroline: false
                },
                zaxis: {
                    title: 'porb',
                    type: 'linear',
                    zeroline: false
                }
            },
            title: '3D Cluster Visualization',
            width: 640
          }
    };
    this.getBackendDataTest();
  }

  zoomCluster(): void {
    console.log(this.selectedCluster);
    if( this.selectedCluster == "all" ){
      this.graph3D["data"] = this.data3D;
    } else {
      var clusterNum: number = Number(this.selectedCluster);
      var copyData = [...this.data3D];
      for( let i = 2; i >= 0; i-- ){
        if( clusterNum != i ){
          copyData.splice(i, 1);
        }
      }
      this.graph3D["data"] = copyData;
    }
  }

  getBackendDataTest(): void {
    this.queryService.getTestQuery().subscribe(response => {
      console.log(response);

      var data = [];
      var colors: string[] = ['red','blue','green'];
      for( let i = 0; i < 3; i ++ ){
        data.push(
          { x: [], y: [], z: [], type: 'scatter3d', mode: 'markers', marker: {color: colors[i], size: 2}, name: `Cluster ${i + 1}`}
        );
      }
      for( let j = 0; j < response.length; j++ ){
        var clusterNum = response[j]["cluster_idx"];
        data[clusterNum].x.push(response[j]["coords"]["mass_diff"]);
        data[clusterNum].y.push(response[j]["coords"]["lumin_diff"]);
        data[clusterNum].z.push(response[j]["coords"]["porb"]);
      }

      this.clusteredData = new ClusteredData(response);
      this.data3D = data;
      this.graph3D["data"] = data;
    });
  }

  configureGraph(): void {
    let dialogRef = this.dialog.open(ConfigureGraphComponent, {
      height: '60%',
      width: '80%',
      data: {"attrs": this.clusteredData.getAllAttr()}
    });

    dialogRef.afterClosed().subscribe(attrsSelected => {
      console.log('The dialog was closed');
      console.log(attrsSelected);

      //TODO: Continue passing this data to the next data structure
    });
  }

}
