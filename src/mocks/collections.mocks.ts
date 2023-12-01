import { CollectionModel, CurrenciesEnum, ERCEnum } from '../app/types'

export const collectionsMocks: CollectionModel[] = [
  {
    ownerAddress: '0x0040f9Fb57b0eD2Db5415c11132078b5CAbF2D4bE6755E71b505a1D47435fD0a',
    contractAddress: '0x0040f9Fb57b0eD2Db5415c11132078b5CAbF2D4bE6755E71b505a1D47435fD0a',
    mintedItems: 50,
    maxItemsPerAddress: 10,
    name: 'Test Collection',
    symbol: 'TCN',
    description: 'Test Collection description',
    totalAmount: 100,
    mintPrice: 0.00001,
    mintCurrency: CurrenciesEnum.ETH,
    contractType: ERCEnum.ERC721,
    soldAmount: 0.001,
    unclaimedAmount: 0.00001,
  },
  {
    ownerAddress: '0x0040f9Fb57b0eD2Db5415c11132078b5CAbF2D4bE6755E71b505a1D47435fD0a',
    contractAddress: '0x0040f9Fb57b0eD2Db5415c11132078b5CAbF2D4bE6755E71b505a1D47435fD0a',
    mintedItems: 50,
    maxItemsPerAddress: 10,
    name: 'Test Collection',
    symbol: 'TCN',
    description: 'Test Collection description',
    totalAmount: 100,
    mintPrice: 0.00001,
    mintCurrency: CurrenciesEnum.ETH,
    contractType: ERCEnum.ERC721,
    soldAmount: 0,
    unclaimedAmount: 0,
  },
]
