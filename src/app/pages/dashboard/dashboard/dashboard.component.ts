import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { BehaviorSubject, from, switchMap } from 'rxjs'

import { collectionsMocks } from '../../../../mocks/collections.mocks'
import { StorageService } from '../../../services/storage.service'
import { CollectionCreatingData, CollectionModel, Metadata } from '../../../types'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  @ViewChild('createDialog', { static: true }) public createDialogRef: TemplateRef<any> | undefined

  public readonly MIN_CLAIMABLE_AMOUNT = 0.00001
  public collectionsMap: Map<string, CollectionModel> = new Map()
  public collectionInx = -1
  public editableInx: number | null = null
  public createMode = false
  public uploadingStatus: boolean | null = false
  public loading$ = new BehaviorSubject<boolean>(true)

  constructor(
    private storageService: StorageService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

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

  public ngOnInit(): void {
    this.loadCollections()
  }

  public async openItem(index: number, contractAddress: string): Promise<void> {
    if (this.collectionInx === index) {
      return
    }
    this.collectionInx = index
    this.loading$.next(true)
    await this.loadMetadata(contractAddress)
    this.loading$.next(false)
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

  public async save(data: CollectionCreatingData): Promise<void> {
    const dialog = this.dialog.open(this.createDialogRef as TemplateRef<object>, {
      disableClose: true,
      hasBackdrop: true,
      minWidth: 320,
      minHeight: 200,
    })

    dialog
      .afterOpened()
      .pipe(
        switchMap(() => {
          return from(this.storageService.uploadDataToIPFS(data))
        }),
      )
      .subscribe((res: string | null) => {
        console.log(res)
        this.uploadingStatus = !!res
      })

    console.log(dialog)
    dialog.afterClosed().subscribe(() => this.closeDialog())
  }

  public closeDialog(): void {
    if (this.uploadingStatus) {
      this.viewMode()
      this.loadCollections()
      return
    }
    console.log('val')
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

  private loadCollections(): void {
    collectionsMocks.forEach((el) => {
      this.collectionsMap.set(el.contractAddress, el)
    })
  }
}
