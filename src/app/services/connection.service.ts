import { Injectable } from '@angular/core'
import { connect, StarknetWindowObject } from 'get-starknet'
import { ConnectOptions } from 'get-starknet/dist/main'
import { map, Observable } from 'rxjs'

import { StateService } from './state.service'

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  public connected$: Observable<boolean> = this.state.state.pipe(map((state) => state.connected))

  constructor(private state: StateService) {}

  public async connect(neverAsk: boolean = false): Promise<void> {
    const modalParams = neverAsk ? { modalMode: 'neverAsk' } : undefined

    const starknet: StarknetWindowObject | null = await connect(modalParams as ConnectOptions)
    console.log(starknet)
    if (!starknet) {
      throw new Error('Failed to connect to wallet.')
    }
    await starknet.enable({ starknetVersion: 'v5' })

    this.state.patchState({ connected: true, starknet })
  }
}
