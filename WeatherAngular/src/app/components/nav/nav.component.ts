import { Component, HostListener, OnInit } from '@angular/core';


@Component({
  selector: 'app-nav',
  template: `<nav [ngClass]="[clases]">
  <div class="container-fluid">
    <a class="navbar-brand brand" href="#">
      <img src="/assets/logo.svg" alt="Logo" width="30" height="28" class="d-inline-block align-text-top">
      Weather Application 
    </a>
  </div>
</nav>`,
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public clases:string = 'navbar nav navTop';

  constructor() { }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event:any){
    if($event.target['scrollingElement'].scrollTop != 0){
      this.clases = 'navbar nav';
    }else{
      this.clases = 'navbar nav navTop';
    }
  }

  ngOnInit(): void {
  }

}
