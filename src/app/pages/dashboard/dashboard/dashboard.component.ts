import { Component } from '@angular/core'

import { collectionsMocks } from '../../../../mocks/collections.mocks'
import { CollectionModel } from '../../../types'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public readonly MIN_CLAIMABLE_AMOUNT = 0.00001
  public collections: CollectionModel[] = collectionsMocks
  public collectionInx = -1

  public createMode = true
  public get collection(): CollectionModel {
    return this.collections[this.collectionInx]
  }

  public get disableClaim(): boolean {
    return this.collection?.unclaimedAmount < this.MIN_CLAIMABLE_AMOUNT
  }

  public get remaining(): number {
    return this.collection ? this.collection.totalAmount - this.collection.mintedItems : 0
  }

  public setStep(index: number): void {
    this.collectionInx = index
  }

  public create(): void {
    this.createMode = true
    this.collectionInx = -1
  }
}
