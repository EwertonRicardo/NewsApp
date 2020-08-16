import { HighlightsModel } from './highlights.model';

export class NewsModel {
    pagination: {
        current_page: number;
        per_page: number;
        total_pages: number;
        total_items: number;
    };
    data: HighlightsModel[] = [];

    constructor(values = {}) {
        Object.keys(this).forEach(key => {
            if (values && values.hasOwnProperty(key))
                this[key] = values[key];
        });
    }
}