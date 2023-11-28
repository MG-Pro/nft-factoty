import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  {
    path: 'mint',
    loadChildren: () => import('./modules/mint/mint.module').then((m) => m.MintModule),
  },
]
