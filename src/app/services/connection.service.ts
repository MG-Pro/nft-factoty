import { Injectable } from '@angular/core'
import { connect, disconnect, StarknetWindowObject } from 'get-starknet'
import { ConnectOptions } from 'get-starknet/dist/main'
import { map, Observable } from 'rxjs'

import { ChainEnum } from '../types'

import { StateService } from './state.service'

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  public connected$: Observable<boolean> = this.state.state.pipe(map((state) => state.connected))

  private starknet: StarknetWindowObject | null = null

  constructor(private state: StateService) {}

  public async connect(neverAsk: boolean = false): Promise<void> {
    const modalParams = neverAsk ? { modalMode: 'neverAsk' } : undefined

    this.starknet = await connect(modalParams as ConnectOptions)
    console.log(this.starknet)
    if (!this.starknet) {
      console.error('Failed to connect to wallet.')
      return
    }
    await this.starknet.enable({ starknetVersion: 'v5' })
    this.setListeners()

    this.state.patchState({
      connected: true,
      starknet: this.starknet,
      chain: this.resolveChain(this.starknet.chainId),
    })
  }

  public async disconnect(): Promise<void> {
    await disconnect({ clearLastWallet: true })
    this.state.resetState()
  }

  public destroy(): void {
    this.starknet?.off('accountsChanged', this.walletHandler.bind(this))
    this.starknet?.off('networkChanged', this.walletHandler.bind(this))
  }

  private resolveChain(chainId?: string): ChainEnum | undefined {
    switch (chainId) {
      case 'SN_MAIN':
        return ChainEnum.SN_MAIN
      case 'SN_GOERLI':
        return ChainEnum.SN_GOERLI
      default:
        return undefined
    }
  }

  private setListeners(): void {
    this.starknet?.on('accountsChanged', this.walletHandler.bind(this))
    this.starknet?.on('networkChanged', this.walletHandler.bind(this))
  }

  private async walletHandler(): Promise<void> {
    this.starknet = await connect()

    if (!this.starknet) {
      await this.disconnect()
      return
    }

    this.state.patchState({
      connected: true,
      starknet: this.starknet,
      chain: this.resolveChain(this.starknet.chainId),
    })
  }
}
