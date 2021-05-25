
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'location'
})
export class LocationPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) {
            return 'unknow';
        }

        return value.split('/').slice(-1).pop();
    }
}
