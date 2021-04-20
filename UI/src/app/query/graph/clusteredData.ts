import { ClusterBinaryStar, ClusterBinaryStarTimesteps } from 'src/app/api/models/clustered-binary-star.model';

export enum GraphType {
  Graph_1D,
  Graph_2D,
  Graph_3D,
}

/**
 * ClusteredData
 *
 * A class to organize data returned from API to be used in graph component
 */
export class ClusteredData {
  public numClusters: number;
  attributes: string[];
  public selectedAttributes: string[];

  jsonData: ClusterBinaryStar[][];
  public graphType: GraphType = 0;

  constructor(jsonData: ClusterBinaryStarTimesteps) {
    this.jsonData = jsonData["timesteps"];

    let attrs = Object.keys(this.jsonData[0][0]['cluster_attributes']);
    this.attributes = new Array(attrs.length);
    for (let i = 0; i < attrs.length; i++) {
      this.attributes[i] = attrs[i];
    }

    this.numClusters = 0;
    for (let i = 0; i < this.jsonData[0].length; i++) {
      if (this.jsonData[0][i]['cluster_idx'] > this.numClusters) {
        this.numClusters = this.jsonData[0][i]['cluster_idx'];
      }
    }
    this.numClusters++;
  }

  getAllAttr(): string[] {
    return this.attributes;
  }

  setSelectedAttributes(attrs: string[]): void {
    this.selectedAttributes = new Array(attrs.length);
    for (let i = 0; i < attrs.length; i++) {
      this.selectedAttributes[i] = attrs[i];
    }
  }

  /**
   *
   * Generates all clusters from the stored data
   *
   */
  getGraphData(): any {
    var data = [];

    //generate colors
    var colors: string[] = new Array(this.numClusters);
    for(let i = 0; i < this.numClusters; i++) {
      //0 - 200 to get darker colors
      var r = Math.floor(Math.random() * 200);
      var g = Math.floor(Math.random() * 200);
      var b = Math.floor(Math.random() * 200);
      colors[i] = 'rgb(' + String(r) +  ', ' + String(g) + ', ' + String(b) + ')';
    }

    if (this.graphType == GraphType.Graph_2D) {
      for (let i = 0; i < this.numClusters; i++) {
        data.push({
          x: [],
          y: [],
          type: 'scatter',
          mode: 'markers',
          marker: { color: colors[i], size: 2 },
          name: `Cluster ${i + 1}`,
          visible: true,
        });
      }
      for (let j = 0; j < this.jsonData.length; j++) {
        var clusterNum = this.jsonData[j]['cluster_idx'];
        data[clusterNum].x.push(
          this.jsonData[j]['cluster_attributes'][this.selectedAttributes[0]]
        );
        data[clusterNum].y.push(
          this.jsonData[j]['cluster_attributes'][this.selectedAttributes[1]]
        );
      }
      return data;
    } else if (this.graphType == GraphType.Graph_3D) {
      for (let i = 0; i < 3; i++) {
        data.push({
          x: [],
          y: [],
          z: [],
          type: 'scatter3d',
          mode: 'markers',
          marker: { color: colors[i], size: 2 },
          name: `Cluster ${i + 1}`,
        });
      }
      for (let j = 0; j < this.jsonData.length; j++) {
        var clusterNum = this.jsonData[j]['cluster_idx'];
        data[clusterNum].x.push(
          this.jsonData[j]['cluster_attributes'][this.selectedAttributes[0]]
        );
        data[clusterNum].y.push(
          this.jsonData[j]['cluster_attributes'][this.selectedAttributes[1]]
        );
        data[clusterNum].z.push(
          this.jsonData[j]['cluster_attributes'][this.selectedAttributes[2]]
        );
      }
      return data;
    } else if (this.graphType == GraphType.Graph_1D) {
      for( let i = 0; i < this.numClusters; i++ ){
        data.push(
          { x: [], y: [], type: 'scatter', mode: 'markers', marker: {color: colors[i], size: 4}, name: `Cluster ${i + 1}`}
        );
      }

      //TODO - this is terribly slow to test with
        // so either fake data
        // or if its possible to create a 2D graph for each attribute in the background or during the inital loading time
          //could possibly even load in one time step at a time
      for( let h = 0; h < this.jsonData.length; h++ ){
        console.log(`timestep ${h} generated`);
        for( let j = 0; j < this.jsonData[h].length; j++ ){
          var clusterNum = this.jsonData[h][j]["cluster_idx"];
          // x - time
          data[clusterNum].x.push(h);
          // data[0].x.push(j);
          // y - attribute
          data[clusterNum].y.push(this.jsonData[h][j]["cluster_attributes"][this.selectedAttributes[0]]);
          // data[0].y.push(j);
        }
      }


      return data;
    }
    return null;
  }
}
