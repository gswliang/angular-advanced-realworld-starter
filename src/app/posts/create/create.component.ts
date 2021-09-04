import { Router } from '@angular/router';
import { PostService } from './../../post.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm = this.formBuilder.group({
    title: this.formBuilder.control('',{
      updateOn: 'change',
      validators: [
        Validators.required,
      ]
    }),
    description: this.formBuilder.control(''),
    body: this.formBuilder.control('',{
      updateOn : 'change',
      validators: [
        Validators.minLength(10)
      ]
    }),
    tags: this.formBuilder.array([
      this.formBuilder.control('Angular'),
      this.formBuilder.control('HTML'),
      this.formBuilder.control('CSS'),
    ]),
  })

  constructor(private formBuilder: FormBuilder, private postService: PostService, private router:Router) { }

  ngOnInit(): void {
  }

  onCreate(){
    console.log(this.createForm.value);

    this.postService.createArticle(this.createForm.value)
    .subscribe(
      ()=>  this.router.navigateByUrl('/')
    )
  }

  get tags():FormArray{
    return this.createForm.get('tags') as FormArray
  }

  addTag(tag:string){
    this.tags.push(this.formBuilder.control(tag))
  }

  removeTag(index:number){
    this.tags.removeAt(index);
  }

}
