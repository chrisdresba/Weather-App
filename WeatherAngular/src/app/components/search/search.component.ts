import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  template: `
    <div class="search">
      <input
        class="search__input"
        placeholder="El clima en..."
        [formControl]="inputSearch"
        (input)="onInputChange($event)"
      />
    </div>
  `,
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  inputSearch = new UntypedFormControl('');
  @Output() submitted = new EventEmitter<string>();

  private keyDownInterval: any;
  private keyPressed: boolean = false;

  ngOnInit(): void {
    this.onChange();
  }

  private onChange(): void {
    this.inputSearch.valueChanges
      .pipe(
        map((search: string) => search.trim()),
        debounceTime(850),
        distinctUntilChanged(),
        filter((search: string) => search !== '')
      )
      .subscribe((search: string) => {
        if (search.length >= 3) {
          this.submitted.emit(search);
        }
      });
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (value === '') {
      if (!this.keyPressed) {
        this.keyPressed = true;
        this.keyDownInterval = setInterval(() => {
          this.checkInputValue();
        }, 100);
      }
    } else {
      clearInterval(this.keyDownInterval);
      this.keyPressed = false;
    }
  }

  private checkInputValue(): void {
    const search = this.inputSearch.value.trim();
    if (search === '') {
      clearInterval(this.keyDownInterval);
      this.keyPressed = false;
      this.submitted.emit(search);
    }
  }
}
