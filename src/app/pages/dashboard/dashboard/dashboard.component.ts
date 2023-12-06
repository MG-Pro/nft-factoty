import { Component, TemplateRef, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'

import { collectionsMocks } from '../../../../mocks/collections.mocks'
import { StorageService } from '../../../services/storage.service'
import { CollectionCreatingData, CollectionModel, Metadata } from '../../../types'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @ViewChild('createDialog', { static: true }) public createDialogRef: TemplateRef<any> | undefined

  public readonly MIN_CLAIMABLE_AMOUNT = 0.00001
  public collectionsMap: Map<string, CollectionModel> = new Map()
  public collectionInx = -1
  public editableInx: number | null = null
  public createMode = true

  constructor(
    private storageService: StorageService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    collectionsMocks.forEach((el) => {
      this.collectionsMap.set(el.contractAddress, el)
    })
  }

  public get collections(): CollectionModel[] {
    return Array.from(this.collectionsMap).map(([_, item]) => item)
  }

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

  public openItem(index: number, contractAddress: string): void {
    if (this.collectionInx === index) {
      return
    }
    this.collectionInx = index
    this.loadMetadata(contractAddress)
  }

  public async loadMetadata(contractAddress: string): Promise<void> {
    const item = this.collectionsMap.get(contractAddress)
    const data: Metadata = await this.storageService.getCollectionMetadata(item?.dataURI as string)

    if (data) {
      this.collectionsMap.set(contractAddress, { ...item, ...data } as CollectionModel)
    }
  }

  public creatingMode(): void {
    this.createMode = true
    this.collectionInx = -1
  }

  public viewMode(): void {
    this.createMode = false
  }

  public async openSaving(data: CollectionCreatingData): Promise<void> {
    await this.storageService.uploadImgToIPFS(data)

    // this.dialog
    //   .open(this.createDialogRef as TemplateRef<any>, {
    //     disableClose: true,
    //     hasBackdrop: true,
    //   })
    //   .afterOpened()
    //   .subscribe(() => {
    //     console.log(11)
    //   })
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

  private save(): void {}
}
