import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { SnackBar } from '../../models/view-models/snack-bar/snack-bar';
import { transition, animate, trigger } from '@angular/animations';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
  animations: [
    trigger('snackBar', [
      transition('initial=>final', animate('5000ms')),
      transition('final=>initial', animate('5000ms')),
    ]),
  ],
})
export class SnackBarComponent implements OnInit {
  public faIcons = { faTimes };

  constructor(
    public snackBarRef: MatSnackBarRef<{}>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackBar
  ) {}

  ngOnInit(): void {}
}
