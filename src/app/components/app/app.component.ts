import { CommonModule } from '@angular/common'
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { RouterOutlet } from '@angular/router'

import { ConnectionService } from '../../services/connection.service'
import { FooterComponent } from '../footer/footer.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  @HostBinding('class') private readonly classes =
    'd-flex h-100 flex-column justify-content-between'

  constructor(public connectionService: ConnectionService) {}

  public async ngOnInit(): Promise<void> {
    await this.connectionService.connect(true)
  }

  public ngOnDestroy(): void {
    this.connectionService.destroy()
  }
}
