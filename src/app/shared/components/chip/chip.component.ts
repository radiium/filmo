import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-chip',
    templateUrl: './chip.component.html',
    styleUrls: ['./chip.component.scss'],
})
export class ChipComponent implements OnInit {

    @Input()
    public selected: boolean = false;

    @Output()
    public selectChange: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() { }
}
