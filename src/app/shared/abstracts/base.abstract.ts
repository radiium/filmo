import { Location } from '@angular/common';
import { Directive, Injector, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '@core/services/loading.service';
import { Subscription } from 'rxjs';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class BaseAbstract implements OnDestroy {

    protected location: Location;
    protected loadingService: LoadingService;
    protected subs: { [key: string]: Subscription } = {};

    constructor(
        public injector: Injector
    ) {
        this.location = this.injector.get<Location>(Location);
        this.loadingService = this.injector.get<LoadingService>(LoadingService);
    }

    ngOnDestroy(): void {
        Object.values(this.subs)
            .map((sub: Subscription) => {
                sub.unsubscribe();
            });
    }
}
