// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mfe1',
  templateUrl: './mfe1.component.html',
  styleUrls: ['./mfe1.component.scss']
})
export class Mfe1Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  navigateToShell() {
    this.router.navigate(['/']);
  }
}
