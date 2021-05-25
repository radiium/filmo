import { Directive, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    selector: '[dropZone]'
})
export class DropZoneDirective implements OnInit {

    @Input()
    private preventBodyDrop: boolean = true;

    @Input()
    public disabled: boolean = false;

    @Output()
    private dragged: EventEmitter<boolean> = new EventEmitter();

    @Output()
    private dropped: EventEmitter<File[]> = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
        this.dragged.emit(false);
    }

    @HostListener('drop', ['$event'])
    private onDrop(event: DragEvent) {
        event.preventDefault();
        this.dragged.emit(false);

        const { dataTransfer } = event;
        const folders = [];

        if (dataTransfer.items) {
            const length = dataTransfer.items.length;
            for (let i = 0; i < length; i++) {
                const entry = dataTransfer.items[i].webkitGetAsEntry();
                if (entry.isDirectory) {
                    // folders.push(entry);
                    folders.push(dataTransfer.items[i].getAsFile());

                } else if (entry.isFile) {
                    console.warn('not a folder');
                }
            }
            this.dropped.emit(folders);

        } else {
            console.warn('dataTransfer.items not found');
        }
    }

    @HostListener('dragover', ['$event'])
    private onDragOver(event: DragEvent) {
        event.stopPropagation();
        event.preventDefault();
        this.dragged.emit(true);
    }

    @HostListener('dragleave', ['$event'])
    private onDragLeave(event: DragEvent) {
        event.stopPropagation();
        event.preventDefault();
        this.dragged.emit(false);
    }

    @HostListener('body:dragover', ['$event'])
    private onBodyDragOver(event: DragEvent) {
        if (this.preventBodyDrop) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    @HostListener('body:drop', ['$event'])
    private onBodyDrop(event: DragEvent) {
        if (this.preventBodyDrop) {
            event.preventDefault();
        }
    }
}
