import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-duration',
    templateUrl: './duration.component.html',
    styleUrls: ['./duration.component.scss'],
})
export class DurationComponent implements OnInit {

    @Input()
    public duration: any;

    constructor() { }

    ngOnInit() { }
}
