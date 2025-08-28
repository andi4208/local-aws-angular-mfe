import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <h1>Shell app is running!</h1>
    <button (click)="navigateToMfe1()">Go to MFE1</button>
  `,
  styles: []
})
export class HomeComponent {
  constructor(private router: Router) {}
  
  navigateToMfe1() {
    this.router.navigate(['/mfe1']);
  }
}
