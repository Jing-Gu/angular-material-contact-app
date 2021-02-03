import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{ path: 'demo', loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule) },
	{ path: 'contactmanager', loadChildren: () => import('./contact-manager/contact-manager.module').then(m => m.ContactManagerModule) },
  { path: '**', redirectTo: 'contactmanager'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
