import { createSelector } from "@ngrx/store";

import * as fromRoot from "../../../app/store";
import * as fromFeature from "../reducers";
import * as fromPizzas from "../reducers/pizzas.reducer";
import * as fromToppings from "./toppings.selectors";

import { Pizza } from "src/products/models/pizza.model";

export const getPizzaState = createSelector(
  fromFeature.getProductsState, // 1st arg is the high level of the state tree
  (state: fromFeature.ProductsState) => state.pizzas // 2nd level of the state tree and return that product
);

export const getPizzasEntities = createSelector(
  getPizzaState,
  fromPizzas.getPizzasEntities // returns objects not array value
);

// returns the array
export const getSelectedPizza = createSelector(
  getPizzasEntities, // feature state
  fromRoot.getRouterState,
  (entities, router): Pizza => {
    return router.state && entities[router.state.params.pizzaId];
  }
);

export const getPizzaVisualized = createSelector(
  getSelectedPizza,
  fromToppings.getToppingsEntities,
  fromToppings.getSelectedToppings,
  (pizza, toppingsEntities, selectedToppings) => {
    const toppings = selectedToppings.map((id) => toppingsEntities[id]);
    return {
      ...pizza,
      toppings,
    };
  }
);

// return an array so component can loop over
export const getAllPizzas = createSelector(getPizzasEntities, (entities) => {
  return Object.keys(entities).map((id) => entities[parseInt(id, 10)]);
});

export const getPizzasLoaded = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoaded
);

export const getPizzasLoading = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoading
);

/* Application's State Tree
  
  const state = {
      products: {
          pizzas: { <--  the pizza reducer handdles this part of the tree
              data: [],
              loaded: false,
              loading: true
          }
      }
  }
  
  */
