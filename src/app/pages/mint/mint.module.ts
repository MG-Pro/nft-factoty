import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatInputModule } from '@angular/material/input'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { provideRouter, Routes } from '@angular/router'

import { HeaderComponent } from '../../components/header/header.component'

import { MintComponent } from './mint/mint.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '0',
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: MintComponent,
  },
]

@NgModule({
  declarations: [MintComponent],
  providers: [provideRouter(routes)],
  imports: [
    CommonModule,
    HeaderComponent,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    FormsModule,
    MatProgressBarModule,
  ],
})
export class MintModule {}
