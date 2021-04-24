import { IClusterRequest } from './cluster-request.model';

export interface Queue {
  finished: boolean;
  id: string;
  query: IClusterRequest;
  dateAdded: Date;
}
