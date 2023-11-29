import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { validateChecksumAddress } from 'starknet'

@Component({
  selector: 'app-mint',
  templateUrl: './mint.component.html',
  styleUrl: './mint.component.scss',
})
export class MintComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    const isAddr = validateChecksumAddress(this.route.snapshot.params['id'])
    console.log(this.route.snapshot.params['id'], isAddr)
    // if (!isAddr) {
    //   this.router.navigateByUrl('dashboard')
    // }
  }
}
