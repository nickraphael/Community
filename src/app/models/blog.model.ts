import { UserBlog } from './userBlog.model'

export class Blog {
    key: string = '';

    name: string = '';
    url: string = '';
    imageUrl: string = '';
    authors: string = '';

    createdBy: string = '';
    dateAdded: Date = new Date();
    
    followers: number = 0;

    // property for current user following this blog
    userBlog: UserBlog;

    public constructor(
        fields?: {
            key?: string,
            name?: string,
            url?: string,
            imageUrl?: string,
            authors?: string,
            createdBy?: string,
            dateAdded?: Date,
            followers?: number,
            userBlog?: UserBlog
        }) {
        if (fields) Object.assign(this, fields);
    }
}