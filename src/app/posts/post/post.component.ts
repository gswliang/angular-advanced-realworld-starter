import { PostService } from './../../post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, shareReplay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


  article$ = this.route.paramMap.pipe(
    map(paramMap=> paramMap.get('id')),
    switchMap(id=> this.postService.getArticle(id)),
    map(result=> result.article),
    shareReplay(1)
  )
  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

}
