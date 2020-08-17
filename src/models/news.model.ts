import { HighlightsModel } from './highlights.model';

export class NewsModel {
    pagination: {
        current_page: number;
        per_page: number;
        total_pages: number;
        total_items: number;
    } = {
            current_page: 0,
            per_page: 0,
            total_pages: 0,
            total_items: 0
        };
    data: HighlightsModel[] = [];

    constructor(values = {}) {
        Object.keys(this).forEach(key => {
            if (values && values.hasOwnProperty(key))
                this[key] = values[key];
        });
    }
}