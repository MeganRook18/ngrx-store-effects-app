import { Injectable } from "@angular/core";
import { Location } from "@angular/common";

import { Router } from "@angular/router";
import { Actions, Effect } from "@ngrx/effects";

import { tap, map } from "rxjs/operators";

import * as RouterActions from "../actions/router.action";

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  // not dispatching an action here, we are handling the side effect of navigating
  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(RouterActions.GO).pipe(
    map((action: RouterActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$
    .ofType(RouterActions.BACK)
    .pipe(tap(() => this.location.back()));

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$
    .ofType(RouterActions.FORWARD)
    .pipe(tap(() => this.location.forward()));
}
