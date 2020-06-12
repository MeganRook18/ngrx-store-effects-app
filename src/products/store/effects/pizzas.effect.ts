import { Injectable } from "@angular/core";

import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { Effect, Actions } from "@ngrx/effects";

import * as fromRoot from "../../../app/store";
import * as pizzaActions from "../actions/pizzas.actions";
import * as fromServices from "../../services";

// Effects return actions either the success action or fail action
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

  // this effect is listening to the createPizza action then we'll use the pizza service
  // to go off & create the pizza bring it back then dispatch the new action
  @Effect()
  createPizza$ = this.actions$.ofType(pizzaActions.CREATE_PIZZA).pipe(
    map((action: pizzaActions.CreatePizza) => action.payload),
    switchMap((pizza) => {
      return this.pizzaService.createPizza(pizza).pipe(
        map((pizza) => new pizzaActions.CreatePizzaSuccess(pizza)),
        catchError((error) => of(new pizzaActions.CreatePizzaFail(error)))
      );
    })
  );

  // listening to the create pizza success action (dispatch above)
  @Effect()
  createPizzaSuccess$ = this.actions$
    .ofType(pizzaActions.CREATE_PIZZA_SUCCESS)
    .pipe(
      map((action: pizzaActions.CreatePizzaSuccess) => action.payload),
      map(
        (pizza) =>
          new fromRoot.Go({
            path: ["/products", pizza.id],
          })
      )
    );

  @Effect()
  updatePizza$ = this.actions$.ofType(pizzaActions.UPDATE_PIZZA).pipe(
    map((action: pizzaActions.UpdatePizza) => action.payload),
    switchMap((pizza) => {
      return this.pizzaService.updatePizza(pizza).pipe(
        map((pizza) => new pizzaActions.UpdatePizzaSuccess(pizza)),
        catchError((error) => of(new pizzaActions.UpdatePizzaFail(error)))
      );
    })
  );

  @Effect()
  removePizza$ = this.actions$.ofType(pizzaActions.REMOVE_PIZZA).pipe(
    map((action: pizzaActions.RemovePizza) => action.payload),
    switchMap((pizza) => {
      return this.pizzaService.removePizza(pizza).pipe(
        // this request does not return any thing as it's just removing so map is empty
        map(() => new pizzaActions.RemovePizzaSuccess(pizza)),
        catchError((error) => of(new pizzaActions.RemovePizzaFail(error)))
      );
    })
  );

  // listening to 2 different types of actions
  // and then navigate to different page
  @Effect()
  handlePizzaSuccess$ = this.actions$
    .ofType(
      pizzaActions.UPDATE_PIZZA_SUCCESS,
      pizzaActions.REMOVE_PIZZA_SUCCESS
    )
    .pipe(
      map((pizza) => {
        return new fromRoot.Go({
          path: ["/products"],
        });
      })
    );
}
