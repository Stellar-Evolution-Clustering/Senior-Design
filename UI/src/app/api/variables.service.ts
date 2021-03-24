import { Injectable } from '@angular/core';
import { Observable, of, scheduled } from 'rxjs';
import { Variable } from './models/variable.model';

@Injectable()
export class VariablesService {
  constructor() {}

  /**
   * TODO: Use actual API
   */
  getVariables(): Observable<Variable[]> {
    var respnose: Variable[] = [
      { name: 'Radius', db_name: 'radc_1' },
      { name: 'Mass', db_name: 'mass_1' },
      { name: 'Luminosity', db_name: 'lumin_1' },
    ];
    return of(respnose);
  }
}
