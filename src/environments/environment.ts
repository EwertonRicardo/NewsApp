import { HttpHeaders } from '@angular/common/http'

export const environment = {
    BASE_URL: "https://mesa-news-api.herokuapp.com/",
}
export let header = new HttpHeaders()
    .set('Content-Type','application/json')
    // .set('Access-Control-Allow-Origin','*')
    // .set('Access-Control-Request-Method','POST, OPTIONS')
    // .set('Access-Control-Request-Headers','*')
    

    


