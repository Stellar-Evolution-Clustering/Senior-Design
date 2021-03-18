

/**
* ClusteredData
*
* A class to organize data returned from API to be used in graph component
*/
export class ClusteredData {

  numClusters: number;
  attributes: string[];
  jsonData: any;


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

  /**
  *
  * Generates all clusters from the stored data
  *
  */
  generate2DGraphData(attr1: string, attr2: string): any {
    //TODO: format the data of this class so that it can be plugged into a plot.ly 3d graph

  }

  /**
  *
  * Generates a single cluster from the stored data
  *
  */
  getSelectiveCluster2DData(clusterNums: number[], attr1: string, attr2: string): any {

  }

  /**
  *
  * Generates all clusters from the stored data
  *
  */
  generate3DGraphData(attr1: string, attr2: string, attr3: string): any {
    //TODO: format the data of this class so that it can be plugged into a plot.ly 3d graph

  }

  /**
  *
  * Generates a single cluster from the stored data
  *
  */
  getSelectiveCluster3DData(clusterNum: number[], attr1: string, attr2: string, attr3: string): any {

  }

}
