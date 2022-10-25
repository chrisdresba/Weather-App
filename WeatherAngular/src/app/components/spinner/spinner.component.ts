import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  public isLoading = this.service.isLoading;

  constructor(private readonly service : SpinnerService) {
   }

  ngOnInit(): void {
  }

}
