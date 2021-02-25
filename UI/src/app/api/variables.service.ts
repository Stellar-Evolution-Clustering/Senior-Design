import { Injectable } from '@angular/core';
import { Observable, of, scheduled } from 'rxjs';
import { Variable } from './models/variable.model';

@Injectable()
export class VariablesService {
  constructor() {}

  getVariables(): Observable<Variable[]> {
    var respnose: Variable[] = [
      { name: 'Helium' },
      { name: 'Mass' },
      { name: 'Luminosity' },
    ];
    return of(respnose);
  }
}
