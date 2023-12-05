import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { collectionsMocks } from '../../../../mocks/collections.mocks'
import { StorageService } from '../../../services/storage.service'
import { CollectionCreatingData, CollectionModel } from '../../../types'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public readonly MIN_CLAIMABLE_AMOUNT = 0.00001
  public collections: CollectionModel[] = collectionsMocks
  public collectionInx = 0
  public editableInx: number | null = null
  public createMode = false

  constructor(
    private storageService: StorageService,
    private router: Router,
  ) {}

  public get collection(): CollectionModel {
    return this.collections[this.collectionInx]
  }

  public get disableClaim(): boolean {
    return this.collection?.unclaimedAmount < this.MIN_CLAIMABLE_AMOUNT
  }

  public get remaining(): number {
    return this.collection ? this.collection.totalAmount - this.collection.mintedItems : 0
  }

  public get editMode(): boolean {
    return Number.isInteger(this.editableInx)
  }

  public setStep(index: number): void {
    this.collectionInx = index
  }

  public creatingMode(): void {
    this.createMode = true
    this.collectionInx = -1
  }

  public viewMode(): void {
    this.createMode = false
  }

  public async save(data: CollectionCreatingData): Promise<void> {
    await this.storageService.uploadData(data)
  }

  public edit(): void {
    this.editableInx = this.collectionInx
  }

  public closeEdit(item: Partial<CollectionModel> | null): void {
    this.editableInx = null
    if (item) {
      this.update(item)
    }
  }

  public update(item: Partial<CollectionModel>): void {
    console.log(item)
  }

  public disable(): void {}

  public claim(): void {}

  public toMintPage(): void {
    this.router.navigateByUrl(`mint/${this.collection.contractAddress}`)
  }
}
