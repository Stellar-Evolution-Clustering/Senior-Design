export enum GraphType {
  Graph_1D,
  Graph_2D,
  Graph_3D
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

  jsonData: any;
  public graphType: GraphType = 0;

  constructor(jsonData: any) {
    this.jsonData = jsonData;

    let attrs = Object.keys(jsonData[0]["coords"]);
    this.attributes = new Array(attrs.length);
    for(let i = 0; i < attrs.length; i++) {
      this.attributes[i] = attrs[i];
    }

    this.numClusters = 0;
    for(let i = 0; i < jsonData.length; i++){
      if(jsonData[i]["cluster_idx"] > this.numClusters) {
        this.numClusters = jsonData[i]["cluster_idx"];
      }
    }
    this.numClusters++;
  }

  getAllAttr(): string[] {
    return this.attributes;
  }

  setSelectedAttributes(attrs: string[]): void {
    this.selectedAttributes = new Array(attrs.length);
    for(let i = 0; i < attrs.length; i++ ){
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
    if( this.graphType == GraphType.Graph_2D ){
      var colors: string[] = ['red','blue','green'];  //TODO: what is there's more that three clusters, it breaks
      for( let i = 0; i < this.numClusters; i ++ ){
        data.push(
          { x: [], y: [], type: 'scatter', mode: 'markers', marker: {color: colors[i], size: 2}, name: `Cluster ${i + 1}`, visible: true}
        );
      }
      for( let j = 0; j < this.jsonData.length; j++ ){
        var clusterNum = this.jsonData[j]["cluster_idx"];

        data[clusterNum].x.push(this.jsonData[j]["coords"][this.selectedAttributes[0]]);
        data[clusterNum].y.push(this.jsonData[j]["coords"][this.selectedAttributes[1]]);
      }
      return data;
    } else if ( this.graphType == GraphType.Graph_3D ){
      var colors: string[] = ['red','blue','green']; //TODO: what is there's more that three clusters
      for( let i = 0; i < 3; i ++ ){
        data.push(
          { x: [], y: [], z: [], type: 'scatter3d', mode: 'markers', marker: {color: colors[i], size: 2}, name: `Cluster ${i + 1}`}
        );
      }
      for( let j = 0; j < this.jsonData.length; j++ ){
        var clusterNum = this.jsonData[j]["cluster_idx"];
        data[clusterNum].x.push(this.jsonData[j]["coords"][this.selectedAttributes[0]]);
        data[clusterNum].y.push(this.jsonData[j]["coords"][this.selectedAttributes[1]]);
        data[clusterNum].z.push(this.jsonData[j]["coords"][this.selectedAttributes[2]]);
      }
      return data;
    } else if ( this.graphType == GraphType.Graph_1D ){
      //TODO: graph just one attribute over time

      // x - time
      // y - attribute


      //TODO: Possibly a 3d one also, x is time y,z are two attributes
    }
    return null;
  }

}
