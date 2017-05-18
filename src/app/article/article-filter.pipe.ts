import { PipeTransform, Pipe } from '@angular/core';

import { IArticle } from '../services/models/article';

@Pipe({
    name: 'articleFilter'
})
export class ArticleFilterPipe implements PipeTransform {

    transform(value: IArticle[], filterBy: string): IArticle[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((article: IArticle) =>
            article.titre.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
