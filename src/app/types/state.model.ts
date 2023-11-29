import { StarknetWindowObject } from 'get-starknet'

export enum ChainEnum {
  'SN_MAIN' = 'Mainnet',
  'SN_GOERLI' = 'Testnet',
}

export interface StateModel {
  connected: boolean
  starknet: StarknetWindowObject | null
  chain?: ChainEnum
  collectionOwner?: boolean
}
