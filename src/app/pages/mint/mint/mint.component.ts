import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { validateChecksumAddress } from 'starknet'

import { collectionsMocks } from '../../../../mocks/collections.mocks'
import { StorageService } from '../../../services/storage.service'
import { CollectionModel, Metadata } from '../../../types'

@Component({
  selector: 'app-mint',
  templateUrl: './mint.component.html',
  styleUrl: './mint.component.scss',
})
export class MintComponent implements OnInit {
  public collection: CollectionModel = collectionsMocks[0]
  public loading$ = new BehaviorSubject<boolean>(false)

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
  ) {}

  public get remaining(): number {
    return this.collection.totalAmount - this.collection.mintedItems
  }

  public get isOwner(): boolean {
    return true
  }

  public async ngOnInit(): Promise<void> {
    const contractAddress = this.route.snapshot.params['id']
    const isAddr = validateChecksumAddress(contractAddress)
    console.log(contractAddress, isAddr)
    // if (!isAddr) {
    //   this.router.navigateByUrl('dashboard')
    // }
    this.loading$.next(true)
    await this.loadCollection(contractAddress)
    this.loading$.next(false)
  }

  public toDashboard(): void {
    this.router.navigateByUrl('dashboard')
  }

  private async loadCollection(contractAddress: string): Promise<void> {
    const collection = collectionsMocks.find(
      ({ contractAddress: adrr }) => adrr === contractAddress,
    )
    if (collection?.dataURI) {
      const data: Metadata = await this.storageService.getCollectionMetadata(collection.dataURI)

      this.collection = { ...collection, ...data }
      console.log(data)
    }
  }
}
