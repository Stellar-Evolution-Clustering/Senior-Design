import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IClusterRequest, ClusterType, DataProcessors, Database } from 'src/app/api/models/cluster-request.model';

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
    //console.log(this.request);
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
        return this.request?.standardizer == null ? "Standard" : this.standardizer;
      case "cluster_type":
        return this.request?.cluster_type == null ? "Undefined" : this.clusterMethod;
      case "database":
        return this.request?.database == null ? "Undefined" : this.request.database;
      case 'temporal_val':
        return this.request?.time_steps == null ? 0 : this.request.time_steps;
      default:
        return "Undefined";
    }
  }

  get clusterMethod(): string {
    switch (this.request?.cluster_type) {
      case ClusterType.DBScan:
        return ClusterType.d_DBScan;
      case ClusterType.KMeans:
        return ClusterType.d_KMeans;
      default:
        return "Undefined"
    }
  }

  get standardizer(): string {
    switch (this.request?.standardizer) {
      case DataProcessors.MinMax:
        return DataProcessors.d_MinMax;
      case DataProcessors.ABS:
        return DataProcessors.d_ABS;
      case DataProcessors.Standard:
        return DataProcessors.d_Standard;
      default:
        return "Undefined";
    }
  }
}

export interface AttributeDisplay {
  name: string,
  weight: number
}