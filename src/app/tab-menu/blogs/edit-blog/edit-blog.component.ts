import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../models/blog.model';
import { GrowlService } from '../../../services/growl.service';
import { Growl } from '../../../models/growl.model';

@Component({
    selector: 'app-edit-blog',
    templateUrl: './edit-blog.component.html',
    styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
    @Input() blog: Blog;
    @Input() isVisible: boolean;
    @Output() visibilityChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    blogForm: FormGroup;

    constructor(
        private _blogService: BlogService,
        private _formBuilder: FormBuilder,
        private _GrowlService: GrowlService) { }

    ngOnInit() {
        this.blog =  new Blog('', '', '', '');
        this.setFormBindings();        
    }

    setFormBindings() {
        this.blogForm = this._formBuilder.group(
            {
                name: [this.blog.name, Validators.required],
                url: [this.blog.url, Validators.required]
            });
    }

    onBeforeShow() {
        this.setFormBindings();
    }

    onBeforeHide() {
        this.isVisible = false;
        this.visibilityChanged.emit(this.isVisible);
    }

    onSubmitForm() {
        this.getValuesFromForm();
        
        if(this.blog.$key != '') {
            this.updateBlog();
        }
        else {
            this.addBlog();
        }
    }

    addBlog() {
            this._blogService.addBlog(this.blog)
                .then(blog => {
                    let messageDetail = 'Thanks for taking the time to let us know about the ' 
                        + this.blogForm.controls['name'].value + ' blog!';
                    this._GrowlService.addGrowl(new Growl('success', 'Blog added', messageDetail));

                    this.isVisible = false;
                    this.visibilityChanged.emit(this.isVisible);
                },
                err => {
                    console.log(err);
                    let messageDetail = 'Oops, something just went awry.  Please try again, it might just be a glitch in the matrix.';
                    this._GrowlService.addGrowl(new Growl('error', 'Save Failed :-(', messageDetail));
                });
    }

    updateBlog() {
            this._blogService.updateBlog(this.blog)
                .then(blog => {
                    let messageDetail = 'Thanks for taking the time to update the ' 
                        + this.blogForm.controls['name'].value + ' blog!';
                    this._GrowlService.addGrowl(new Growl('success', 'Blog updated', messageDetail));

                    this.isVisible = false;
                    this.visibilityChanged.emit(this.isVisible);
                },
                err => {
                    console.log(err);
                    let messageDetail = 'Oops, something just went awry.  Please try again, it might just be a glitch in the matrix.';
                    this._GrowlService.addGrowl(new Growl('error', 'Save Failed :-(', messageDetail));
                });
    }

    private getValuesFromForm() {
        this.blog.name = this.blogForm.controls['name'].value;
        this.blog.url = this.blogForm.controls['url'].value;        
    }


}
