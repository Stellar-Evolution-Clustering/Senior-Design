import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IClusterRequest, ClusterType, DataProcessors, } from 'src/app/api/models/cluster-request.model';

@Component({
  selector: 'app-query-summary',
  templateUrl: './query-summary.component.html',
  styleUrls: ['./query-summary.component.scss']
})
export class QuerySummaryComponent implements OnInit {
  @Input() request : IClusterRequest;
  @Input() attributeTable : any;

  tableSource : MatTableDataSource<AttributeDisplay>;
  columnsToDisplay: string[] = ['name', 'weight'];

  constructor() {
    this.tableSource = new MatTableDataSource(this.attributeTable);
   }

  ngOnInit(): void {
    console.log(this.request);
  }

  get usingDBScan() : boolean {
    return this.request?.cluster_type == ClusterType.DBScan;
  }

  getRequestParam(param: string) : any {
    switch (param) {
      case "n_clusters":
        return this.request?.n_clusters == null ? 0 : this.request.n_clusters;
      case "n_samples":
        return this.request?.n_samples == null ? 0 : this.request.n_samples;
      case "eps":
        return this.request?.eps == null ? 0 : this.request.eps;
      case "standardizer":
        return this.standardizer;
      case "cluster_type":
        return this.clusterMethod;
      default:
        break;
    }
  }

  get clusterMethod(): string {
    switch (this.request?.cluster_type) {
      case ClusterType.DBScan:
        return "DBScan";
      case ClusterType.KMeans:
        return "K-Means";
      default:
        return "Undefined"
    }
  }

  get standardizer(): string {
    switch (this.request?.standardizer) {
      case DataProcessors.MinMax:
        return "MinMax";
      case DataProcessors.ABS:
        return "ABS";
      case DataProcessors.Standard:
      default:
        return "Standard";
    }
  }
}

export interface AttributeDisplay {
  name: string,
  weight: number
}