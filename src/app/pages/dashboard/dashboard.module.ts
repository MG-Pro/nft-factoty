import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatIconModule } from '@angular/material/icon'
import { provideRouter, Routes } from '@angular/router'

import { CollectionFormComponent } from '../../components/collection-form/collection-form.component'
import { HeaderComponent } from '../../components/header/header.component'

import { DashboardComponent } from './dashboard/dashboard.component'

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
]

@NgModule({
  declarations: [DashboardComponent],
  providers: [provideRouter(routes)],
  imports: [
    CommonModule,
    HeaderComponent,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatDividerModule,
    CollectionFormComponent,
  ],
})
export class DashboardModule {}
