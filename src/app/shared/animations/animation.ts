import { animate, style, transition, trigger } from '@angular/animations';

export const listAnimation = trigger('listAnimation', [
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'translateY(50px)'
        }),
        animate('500ms ease-out', style({
            opacity: 1,
            transform: 'translateY(0)'
         }))
    ]),
    transition(':leave', [
        animate('200ms', style({ opacity: 0 }))
    ])
]);
