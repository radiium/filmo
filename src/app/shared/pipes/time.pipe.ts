
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'time'
})
export class TimePipe implements PipeTransform {
    transform(value: number = 0): string {
        if (isNaN(parseFloat(String(value))) || !isFinite(value)) {
            return '';
        }

        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value % 3600) / 60);
        const seconds = value % 60;

        let result = `${minutes
            .toString()
            .padStart(1, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (!!hours) {
            result = `${hours.toString()}h${minutes.toString().padStart(2, '0')}min`;
            // ${seconds.toString().padStart(2, '0')}`;
        }
        return result;
    }
}
