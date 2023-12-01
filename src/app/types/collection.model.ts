export enum CurrenciesEnum {
  ETH = 'ETH',
}

export enum ERCEnum {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

export interface CollectionModel {
  ownerAddress: string
  contractAddress: string
  mintedItems: number
  maxItemsPerAddress: number
  name: string
  symbol: string
  description: string
  totalAmount: number
  mintPrice: number
  mintCurrency: CurrenciesEnum
  contractType: ERCEnum
  soldAmount: number
  unclaimedAmount: number
}
