import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";

import * as fromPizzas from "./pizzas.reducer";

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer,
};

// Steping through State Tree by the selector methods.
// 'products' relates to the products.module.ts StoreModule.forFeature("products", reducers)
export const getProductsState = createFeatureSelector<ProductsState>(
  "products"
);

// pizzas state
export const getPizzaState = createSelector(
  getProductsState, // 1st arg is the high level of the state tree
  (state: ProductsState) => state.pizzas // 2nd level of the state tree and return that product
);

export const getAllPizzas = createSelector(getPizzaState, fromPizzas.getPizzas);
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
