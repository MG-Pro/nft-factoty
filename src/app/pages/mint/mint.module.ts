import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { provideRouter, Routes } from '@angular/router'

import { HeaderComponent } from '../../components/header/header.component'

import { MintComponent } from './mint/mint.component'

const routes: Routes = [
  {
    path: '',
    component: MintComponent,
  },
]

@NgModule({
  declarations: [MintComponent],
  providers: [provideRouter(routes)],
  imports: [CommonModule, HeaderComponent],
})
export class MintModule {}
