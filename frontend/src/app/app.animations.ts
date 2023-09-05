import { animate, style, transition, trigger } from "@angular/animations";


export const slideInOut = trigger('slideInOut', [
    transition(':enter', [
        style({transform: "translateY(20%)", opacity: "0"}),
        animate('0.3s 0.2s ease-out', style({transform: "translateY(0%)", opacity: "1"}))
    ]),
    transition(':leave', [
        style({opacity: "1"}),
        animate('0.2s ease-out', style({opacity: "0"}))
    ])
])