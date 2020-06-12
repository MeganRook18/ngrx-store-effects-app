import { Injectable } from "@angular/core";

import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { Effect, Actions } from "@ngrx/effects";

import * as toppingsAction from "../actions/toppings.actions";
import * as fromServices from "../../services";

@Injectable()
export class ToppingsEffects {
  constructor(
    private actions$: Actions,
    private toppingsService: fromServices.ToppingsService
  ) {}

  @Effect()
  loadToppings$ = this.actions$.ofType(toppingsAction.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingsService.getToppings().pipe(
        map((toppings) => new toppingsAction.LoadToppingsSuccess(toppings)),
        // wrap in of() so can return the error as an obserable
        catchError((error) => of(new toppingsAction.LoadToppingsFail(error)))
      );
    })
  );
}
