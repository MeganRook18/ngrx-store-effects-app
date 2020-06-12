import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromPizzas from "./pizzas.reducer";
import * as fromToppings from "./toppings.reducer";

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
  toppings: fromToppings.ToppingsState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer,
  toppings: fromToppings.reducer,
};

// Steping through State Tree by the selector methods.
// 'products' relates to the products.module.ts StoreModule.forFeature("products", reducers)
export const getProductsState = createFeatureSelector<ProductsState>(
  "products"
);
