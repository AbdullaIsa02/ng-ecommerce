import { Injectable, } from "@angular/core";
import { of } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class CategoryApi {
    private categories = ['all','electronics','clothing', 'accessories', 'home', ];

    getCategories() {
        return of (this.categories);
    }
}
