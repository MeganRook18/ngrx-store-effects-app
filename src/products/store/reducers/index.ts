import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
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

