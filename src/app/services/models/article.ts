export interface IArticle {
	_id: number;
    auteur: String;
	titre: String;
	description: String;
	url: String;
	tags: [String];
	creation: Date;
	visible: Boolean;
	views: number;
	likes: number;
	rate: number;
	rates: number;
	raters: number;
	category: String;
	imageUrl: String;
}
