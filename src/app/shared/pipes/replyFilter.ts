import { Pipe, PipeTransform } from '@angular/core';

import { IReply } from '../../services/models/reply';

@Pipe({
    name: 'replyFilter'
})

export class ReplyFilterPipe implements PipeTransform {
  transform(replies: IReply[], comment_author:String, comment_creation: Date): IReply[] {
    return replies.filter(reply => reply.comment_author == comment_author && reply.comment_creation == comment_creation);
  }
}
