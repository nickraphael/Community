
export class Blog {
    $key: string;

    name: string;
    url: string;
    imageUrl: string;
    followers: number;
    dateAdded: Date;

    constructor(_$key: string, _name: string, _url: string, _imageUrl: string, _followers: number) {
        this.$key = _$key;
        this.name = _name;
        this.url = _url;
        this.imageUrl = _imageUrl;
        this.followers = _followers;

        this.dateAdded = new Date();
    }
}