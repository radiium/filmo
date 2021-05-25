import { SortType } from './sort-type.enum';
import { SortOrderType } from './sort-order-type.enum';

export interface MovieSorter {
    by: SortType;
    order: SortOrderType;
}
