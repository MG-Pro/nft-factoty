import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  {
    path: 'mint',
    loadChildren: () => import('./pages/mint/mint.module').then((m) => m.MintModule),
  },
]
