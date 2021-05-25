import { Directive, Injector } from '@angular/core';
import { BaseAbstract } from './base.abstract';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class ComponentAbstract extends BaseAbstract  {

    constructor(public injector: Injector) {
        super(injector);
    }
}
