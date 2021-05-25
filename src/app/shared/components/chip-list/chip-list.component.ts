import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-chip-list',
    templateUrl: './chip-list.component.html',
    styleUrls: ['./chip-list.component.scss'],
})
export class ChipListComponent implements OnInit {

    @Input()
    public items: string[] = [];

    @Input()
    public selected: string = '';

    @Output()
    public selectChange: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    onSelect(value: string): void {
        this.selectChange.emit(value);
    }
}
