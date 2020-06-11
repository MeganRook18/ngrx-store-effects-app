import { Injectable } from "@angular/core";

import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { Effect, Actions } from "@ngrx/effects";

import * as pizzaActions from "../actions/pizzas.actions";
import * as fromServices from "../../services";

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService
  ) {}

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS).pipe(
    switchMap(() => {
      // switch to the new observable stream
      // and then map over getPizzas results
      return this.pizzaService.getPizzas().pipe(
        map((pizzas) => new pizzaActions.LoadPizzasSuccess(pizzas)),
        catchError((error) => of(new pizzaActions.LoadPizzasFail(error)))
      );
    })
  );
}
