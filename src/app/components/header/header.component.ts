import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { connect } from 'get-starknet'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public async connectWallet(): Promise<void> {
    const starknet = await connect()

    if (!starknet) throw new Error('Failed to connect to wallet.')
    await starknet.enable({ starknetVersion: 'v5' })
  }
}
