import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as fromStore from "../../store";
import { Pizza } from "../../models/pizza.model";

/**
 *  Through out this application we have disabled auto ChangeDetectionStrategy
 *  This makes the angular application a lot faster when we're just relying on
 *  the store and the object reference check to actually change.
 *
 *  We have no other local component state that needs to be detected
 *  that there is a change as we're relying on the store actions & reducers 'pushing'
 *  the local to our components. This is why we can use ChangeDetectionStrategy.OnPush
 */

@Component({
  selector: "products",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["products.component.scss"],
  template: `
    <div class="products">
      <div class="products__new">
        <a class="btn btn__ok" routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <div *ngIf="!(pizzas$ | async)?.length">
          No pizzas, add one to get started.
        </div>
        <pizza-item *ngFor="let pizza of pizzas$ | async" [pizza]="pizza">
        </pizza-item>
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.pizzas$ = this.store.select<any>(fromStore.getAllPizzas);
  }
}
