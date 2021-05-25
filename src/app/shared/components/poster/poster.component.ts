import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ComponentAbstract } from '@shared/abstracts/component.abstract';

@Component({
    selector: 'app-poster',
    templateUrl: './poster.component.html',
    styleUrls: ['./poster.component.scss'],
})
export class PosterComponent extends ComponentAbstract {

    @Input()
    public src: string = '';

    @Input()
    public srcFallback: string = '';

    @Input()
    public alt: string = '';

    public isLoaded: boolean = false;

    constructor(public injector: Injector) {
        super(injector);
    }

    public ionError(): void {
        this.src = this.srcFallback;
        this.isLoaded = false;
        //
    }

    public ionImgDidLoad(): void {
        this.isLoaded = true;
    }

    public ionImgWillLoad(): void {
    }
}
