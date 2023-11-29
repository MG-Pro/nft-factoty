import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { provideRouter, Routes } from '@angular/router'

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
  imports: [CommonModule],
})
export class DashboardModule {}
