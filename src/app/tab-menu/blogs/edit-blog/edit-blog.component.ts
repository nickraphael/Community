import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BlogService } from '../../../services/blog.service'

@Component({
    selector: 'app-edit-blog',
    templateUrl: './edit-blog.component.html',
    styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
    @Input() blog;
    @Input() isVisible;

    blogForm: FormGroup;

    constructor(
        private _blogService: BlogService,
        private _formBuilder: FormBuilder) { }

    ngOnInit() {        
        this.blogForm = this._formBuilder.group(
            {
                name: [this.blog == null ? '' : this.blog.name, Validators.required],
                url: [this.blog == null ? '' : this.blog.url, Validators.required]
            });        
    }

    onSubmitForm() {
        this._blogService.blogs$.push(this.blogForm.value);
    }

}
