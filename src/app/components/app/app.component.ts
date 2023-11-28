import { CommonModule } from '@angular/common'
import { Component, HostBinding, OnInit } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { RouterOutlet } from '@angular/router'

import { FooterComponent } from '../footer/footer.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @HostBinding('class') private readonly classes =
    'd-flex h-100 flex-column justify-content-between'

  public ngOnInit(): void {}
}