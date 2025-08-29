import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-home',
  template: `
    <div style="padding: 20px; max-width: 800px; margin: 0 auto;">
      <h1>Shell app is running!</h1>
      <p>Welcome to the Shell application.</p>
      
      <div *ngIf="showMfeButton">
        <button (click)="navigateToMfe1()">Go to MFE1</button>
      </div>
      <div *ngIf="!showMfeButton">
        <p>MFE1 integration is not configured in this environment.</p>
      </div>
      
      <div style="margin-top: 20px; padding: 10px; background-color: #f5f5f5; border-radius: 4px;">
        <p><strong>Environment Info:</strong></p>
        <p>Production mode: {{isProduction ? 'Yes' : 'No'}}</p>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  isProduction = environment.production;
  showMfeButton = !!environment.mfe1URL;
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    console.log('Home component initialized with environment:', environment);
  }
  
  navigateToMfe1() {
    console.log('Navigating to MFE1');
    this.router.navigate(['/mfe1']);
  }
}
