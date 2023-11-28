import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { connect } from 'get-starknet'
import { Provider } from 'starknet'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public ngOnInit(): void {
    console.log(44)
    const provider = new Provider({ sequencer: { baseUrl: 'http://127.0.0.1:5050' } })

    // new ContractFactory( compiledContract, classHash, account, [ , abi ] )
  }

  public async connectWallet(): Promise<void> {
    const starknet = await connect()

    if (!starknet) throw new Error('Failed to connect to wallet.')
    await starknet.enable({ starknetVersion: 'v5' })
  }
}
