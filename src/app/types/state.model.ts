import { StarknetWindowObject } from 'get-starknet'

export interface StateModel {
  connected: boolean
  starknet: StarknetWindowObject | null
}
