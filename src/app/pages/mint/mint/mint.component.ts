import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { validateChecksumAddress } from 'starknet'

import { collectionsMocks } from '../../../../mocks/collections.mocks'
import { CollectionModel } from '../../../types'

@Component({
  selector: 'app-mint',
  templateUrl: './mint.component.html',
  styleUrl: './mint.component.scss',
})
export class MintComponent implements OnInit {
  public collection: CollectionModel = collectionsMocks[0]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public get remaining(): number {
    return this.collection.totalAmount - this.collection.mintedItems
  }

  public get isOwner(): boolean {
    return true
  }

  public ngOnInit(): void {
    const isAddr = validateChecksumAddress(this.route.snapshot.params['id'])
    console.log(this.route.snapshot.params['id'], isAddr)
    // if (!isAddr) {
    //   this.router.navigateByUrl('dashboard')
    // }
  }

  public toDashboard(): void {
    this.router.navigateByUrl('dashboard')
  }
}
