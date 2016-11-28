
export class UserBlog {
    blogKey: string;

    dateAdded: Date;

    constructor(_blogKey: string, _dateAdded: Date) {
        this.blogKey = _blogKey;
        this.dateAdded = _dateAdded;
    }
}