export enum CurrenciesEnum {
  ETH = 'ETH',
}

export enum ERCEnum {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

export interface CollectionCreatingData {
  image: File
  name: string
  symbol: string
  description: string
  totalAmount: number
  mintPrice: number
  editable: boolean
  mintCurrency: CurrenciesEnum
  contractType: ERCEnum
  ownerAddress: string
  maxItemsPerAddress: number
}

export interface Metadata {
  image: string
  description: string
  name: string
}

export interface CollectionModel extends Metadata {
  ownerAddress: string
  contractAddress: string
  mintedItems: number
  maxItemsPerAddress: number
  symbol: string
  totalAmount: number
  mintPrice: number
  mintCurrency: CurrenciesEnum
  contractType: ERCEnum
  soldAmount: number
  unclaimedAmount: number
  editable: boolean
  disabled: boolean
  dataURI: string
}
