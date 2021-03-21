import { Component, OnInit } from '@angular/core';
import { QueryService } from '../../api/query.service';
import { ClusteredData } from './clusteredData';
import { ConfigureGraphComponent } from './configure-graph/configure-graph.component';
import { GraphType } from './clusteredData';


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
  public graph2D;
  public graph3D;
  selectedCluster: string;

  private data3D: any;
  public clusteredData: ClusteredData;
  public selectedClusters: boolean[];

  constructor(
    private queryService: QueryService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.selectedCluster = "all";
    this.data3D = null;
    this.graph2D = {
          data: null,
          layout: {width: 640, height: 480, title: '2D Cluster Visualization'}
    };
    this.graph3D = {
          data: this.data3D,
          layout: {
            autosize: true,
            width: 640,
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
            title: '3D Cluster Visualization'
          }
    };
    this.getBackendDataTest();
  }

  getBackendDataTest(): void {
    this.queryService.getTestQuery().subscribe(response => {
      console.log(response);

      this.clusteredData = new ClusteredData(response);
      this.selectedClusters = new Array(this.clusteredData.numClusters);

      //Set to 3D graph by default
      this.clusteredData.graphType = GraphType.Graph_3D;
      this.clusteredData.setSelectedAttributes(this.clusteredData.getAllAttr());
      this.graph3D["data"] = this.clusteredData.getGraphData();

      //Show all clusters by default
      for( let i = 0; i < this.selectedClusters.length; i++ ){
        this.selectedClusters[i] = true;
      }

    });
  }

  configureGraph(): void {
    let dialogRef = this.dialog.open(ConfigureGraphComponent, {
      height: '60%',
      width: '80%',
      data: {"attrs": this.clusteredData.getAllAttr()}
    });

    dialogRef.afterClosed().subscribe(data => {
      this.clusteredData.graphType = data['graphType'];
      this.clusteredData.setSelectedAttributes(data['attrs']);

      if( this.clusteredData.graphType == GraphType.Graph_2D ){
        this.graph2D["data"] = this.clusteredData.getGraphData();
      } else if ( this.clusteredData.graphType == GraphType.Graph_3D ) {
        this.graph3D["data"] = this.clusteredData.getGraphData();
      }
    });
  }

  trackBySelectedCluster(index: number, cluster: any): number {
    return index;
  }

  selectedClustersChanged(event){
    for( let i = 0; i < this.clusteredData.numClusters; i++ ){
      if( !this.selectedClusters[i] ){
        if( this.clusteredData.graphType == GraphType.Graph_2D ){
          this.graph2D["data"][i].visible = false;
        } else if ( this.clusteredData.graphType == GraphType.Graph_3D ){
          this.graph3D["data"][i].visible = false;
        }
      } else {
        if( this.clusteredData.graphType == GraphType.Graph_2D ){
          this.graph2D["data"][i].visible = true;
        } else if ( this.clusteredData.graphType == GraphType.Graph_3D ){
          this.graph3D["data"][i].visible = true;
        }
      }
    }
  }

}
