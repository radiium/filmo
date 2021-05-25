import { Directive, AfterViewInit, HostBinding, Input, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
    selector: 'img[lazyloadImage]'
})
export class LazyloadImageDirective implements AfterViewInit {

    private loaded: boolean = false;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {
    }

    ngAfterViewInit() {
        console.log(this.el, this.loaded)
        if (this.el && !this.loaded) {
            this.renderer.setStyle(this.el.nativeElement, 'opacity', 0);
            this.renderer.setStyle(this.el.nativeElement, 'transition', 'opacity ease 2s');
        }
    }

    @HostListener('load')
    private onLoad(): void {
        // console.log('image onLoad');
        this.renderer.setStyle(this.el.nativeElement, 'opacity', 1);
        this.loaded = true;
    }

    @HostListener('error')
    private onError(): void {
        // console.log('image error');
        this.renderer.setStyle(this.el.nativeElement, 'opacity', 0);
        this.loaded = true;
    }
}
