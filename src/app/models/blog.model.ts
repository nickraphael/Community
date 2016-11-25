
export class Blog {
    $key: string;

    name: string;
    url: string;
    imageUrl: string;

    popularityScore: number;

    constructor(_$key: string, _name: string, _url: string, _imageUrl: string) {
        this.$key = _$key;
        this.name = _name;
        this.url = _url;
        this.imageUrl = _imageUrl;
    }
}