import { Pipe, PipeTransform } from '@angular/core';

import { IReply } from '../services/models/reply';

@Pipe({
    name: 'replyFilter'
})

export class ReplyFilterPipe implements PipeTransform {
  transform(replies: IReply[], comment_auteur:String, comment_creation: Date): IReply[] {

    console.log(replies[0].comment_auteur +" == "+ comment_auteur);
    console.log(replies[0].comment_creation +" == "+ comment_creation);
    return replies.filter(reply => reply.comment_auteur == comment_auteur && reply.comment_creation == comment_creation);
  }
}