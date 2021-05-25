import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: 'img[appImgFallback]'
})
export class ImgFallbackDirective {

    @Input()
    private appImgFallback: string;

    constructor(private elRef: ElementRef) { }

    @HostListener('error')
    onLoadError() {
        const element: HTMLImageElement = <HTMLImageElement>this.elRef.nativeElement;
        element.src = this.appImgFallback || 'assets/images/fallback-image.png';
    }

}
