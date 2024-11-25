import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountStatsComponent } from './components/account-stats/account-stats.component';
import { PhoneStatsComponent } from './components/phone-stats/phone-stats.component';
import { FilterComponent } from './components/filter/filter.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: 'account-stats', component: AccountStatsComponent },
  { path: 'phone-stats', component: PhoneStatsComponent },
  { path: 'filter', component: FilterComponent },
  {path: 'Summary', component: SummaryComponent},
  { path: '', redirectTo: '/Summary', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
