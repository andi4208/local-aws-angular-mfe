// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home.component';

function loadMFE(url: string) {
  console.log('Attempting to load MFE from URL:', url);
  
  // If the URL is empty, go straight to error page
  if (!url) {
    console.log('MFE URL is empty, loading error page');
    return import('./error-page/error-page.module').then(m => m.ErrorPageModule);
  }
  
  return loadRemoteModule({
    type: 'module',
    remoteEntry: `${url}/remoteEntry.js`,
    exposedModule: './Module'
  })
  .then(m => {
    console.log('MFE module loaded successfully');
    return m.Mfe1Module;
  })
  .catch(err => {
    console.error('Error loading MFE:', err);
    return import('./error-page/error-page.module').then(m => m.ErrorPageModule);
  });
}

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'mfe1',
    loadChildren: () => loadMFE(environment.mfe1URL)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
