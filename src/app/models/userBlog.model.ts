
export class UserBlog {
    firebaseKey: string;

    blogKey: string;
    dateAdded: Date;

    constructor(_firebaseKey: string, _blogKey: string, _dateAdded: Date) {
        this.firebaseKey = _firebaseKey;
        this.blogKey = _blogKey;
        this.dateAdded = _dateAdded;
    }
}