import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

import { StateModel } from '../types/state.model'

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private globalState = new BehaviorSubject<StateModel>({ connected: false, starknet: null })

  public get state(): Observable<StateModel> {
    return this.globalState
  }

  public patchState(value: Partial<StateModel>): void {
    this.globalState.next({ ...this.globalState.value, ...value })
  }
}
