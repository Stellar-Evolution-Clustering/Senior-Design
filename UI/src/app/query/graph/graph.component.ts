import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import {
  ClusterBinaryStar,
  ClusterBinaryStarTimesteps,
} from 'src/app/api/models/clustered-binary-star.model';
import { IClusterRequest } from 'src/app/api/models/cluster-request.model';
import { QueryService } from '../../api/query.service';
import { ClusteredData, GraphType } from './clusteredData';
import { ConfigureGraphComponent } from './configure-graph/configure-graph.component';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  public graph2D;
  public graph3D;
  selectedCluster: string;

  private data3D: any;
  public clusteredData: ClusteredData;
  public GraphTypeEnum = GraphType;

  public badRequest: boolean = false;

  constructor(
    private queryService: QueryService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selectedCluster = 'all';
    this.data3D = null;
    this.graph2D = {
      data: null,
      layout: {
        width: 640,
        height: 480,
        hovermode: false,
        title: '1 Attribute Visualization',
        xaxis: {
          title: {
            text: '',
            font: {
              size: 20,
            },
          },
          type: 'linear',
          zeroline: false,
        },
        yaxis: {
          title: {
            text: '',
            font: {
              size: 20,
            },
          },
          type: 'linear',
          zeroline: false,
        },
      },
    };
    this.graph3D = {
      data: this.data3D,
      layout: {
        autosize: true,
        hovermode: false,
        width: window.innerWidth * 0.7, //640,
        height: window.innerHeight * 0.7, //480,
        scene: {
          aspectratio: {
            x: 1,
            y: 1,
            z: 1,
          },
          camera: {
            center: {
              x: 0,
              y: 0,
              z: 0,
            },
            eye: {
              x: 1.5,
              y: 1.5,
              z: 1.5,
            },
            up: {
              x: 0,
              y: 0,
              z: 1,
            },
          },
          xaxis: {
            title: {
              text: '',
              font: {
                size: 20,
              },
            },
            type: 'linear',
            zeroline: false,
          },
          yaxis: {
            title: {
              text: '',
              font: {
                size: 20,
              },
            },
            type: 'linear',
            zeroline: false,
          },
          zaxis: {
            title: {
              text: '',
              font: {
                size: 20,
              },
            },
            type: 'linear',
            zeroline: false,
          },
        },
        title: '2 Attribute Visualization',
      },
    };
    this.getBackendDataTest();
  }

  getBackendDataTest(): void {
    this.route.queryParams
      .pipe(
        concatMap((params: any) => {
          return this.queryService.getCluster(params.queryId);
        })
      )
      .subscribe((response: ClusterBinaryStarTimesteps) => {
        console.log('API response');
        console.log(response);
        if (response === null) {
          this.badRequest = true;
          return;
        }
        this.clusteredData = new ClusteredData(response);
        this.set3DGraph();
      });
  }

  configureGraph(): void {
    let dialogRef = this.dialog.open(ConfigureGraphComponent, {
      data: {
        attrs: this.clusteredData.getAllAttr(),
        graphType: this.clusteredData.graphType,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.clusteredData.graphType = data['graphType'];
      this.clusteredData.setSelectedAttributes(data['attrs']);
      if (this.clusteredData.graphType == GraphType.Graph_2_Attr) {
        this.set3DGraph();
      } else if (this.clusteredData.graphType == GraphType.Graph_1_Attr) {
        this.set2DGraph();
      }
    });
  }

  set3DGraph() {
    this.graph3D['data'] = this.clusteredData.getGraphData();
    this.graph3D.layout.scene.xaxis.title.text = 'time';
    this.graph3D.layout.scene.yaxis.title.text = this.clusteredData.selectedAttributes[0];
    this.graph3D.layout.scene.zaxis.title.text = this.clusteredData.selectedAttributes[1];
  }

  set2DGraph() {
    this.graph2D['data'] = this.clusteredData.getGraphData();
    this.graph2D.layout.xaxis.title.text = 'time';
    this.graph2D.layout.yaxis.title.text = this.clusteredData.selectedAttributes[0];
  }
}
