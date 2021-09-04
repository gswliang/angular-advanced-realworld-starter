
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  articles$= this.postService.getArticles().pipe(map(result=> result.articles));

  constructor(private postService: PostService) { }

  ngOnInit(): void {

  }




}
