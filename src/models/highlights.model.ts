export class HighlightsModel {

    title: string = '';
    description: string = '';
    content: string = '';
    author: string = '';
    published_at: string = '';
    highlight: boolean = false;
    url: string = '';
    image_url: string = '';
    favourite: boolean = false;

    constructor(values = {}) {
        Object.keys(this).forEach(key => {
            if (values && values.hasOwnProperty(key))
                this[key] = values[key];
        });
    }
}