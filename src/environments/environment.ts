import { HttpHeaders } from '@angular/common/http'

export const environment = {
    BASE_URL: "https://mesa-news-api.herokuapp.com/",
}
export let header = new HttpHeaders()
    .set('Content-Type','application/json')

