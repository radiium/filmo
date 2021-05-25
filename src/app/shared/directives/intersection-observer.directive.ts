import { Directive, OnInit, AfterViewInit, OnDestroy,
    Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Observer, Observable, Subscription } from 'rxjs';
import { flatMap, map, distinctUntilChanged } from 'rxjs/operators';

@Directive({
    selector: '[appIntersectionObserver]',
})
export class IntersectionObserverDirective implements OnInit, AfterViewInit, OnDestroy {

    @Input()
    public intersectionObserverInit: IntersectionObserverInit = {
        root: document.body,
        rootMargin: '0px',
        threshold: 0
    };

    @Input()
    public once: boolean = false;

    @Output()
    public visibilityChange = new EventEmitter<boolean>();

    private intersectionObserver: IntersectionObserver;
    private subscription: Subscription;

    constructor(private el: ElementRef) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.subscription = this.getIntersectionObserver().subscribe({
            next: (isVisible: boolean) => {
                this.visibilityChange.emit(isVisible);
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.disconnect();
    }

    private getIntersectionObserver() {
        return new Observable((subscriber: Observer<IntersectionObserverEntry[]>) => {
            this.intersectionObserver = new IntersectionObserver(
                (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
                    subscriber.next(entries);
                },
                this.intersectionObserverInit
            );
            this.intersectionObserver.observe(this.el.nativeElement);

            return () => {
                this.disconnect();
            };
        })
        .pipe(
            flatMap(entries => entries),
            map(entry => {
                const isVisible = (entry.isIntersecting || entry.intersectionRatio > 0);
                if (isVisible && this.once) {
                    this.disconnect();
                }
                return isVisible;
            }),
            distinctUntilChanged()
        );
    }

    private observe(): void {
        if (this.intersectionObserver && this.el.nativeElement) {
            this.intersectionObserver.observe(this.el.nativeElement as Element);
        }
    }

    private unobserve(): void {
        if (this.intersectionObserver && this.el.nativeElement) {
            this.intersectionObserver.unobserve(this.el.nativeElement as Element);
        }
    }

    private disconnect() {
        if (this.intersectionObserver) {
            if (this.el) {
                this.intersectionObserver.unobserve(this.el.nativeElement);
            }
            this.intersectionObserver.disconnect();
        }
    }
}
