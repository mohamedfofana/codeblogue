export interface IArticle {
    auteur: String;
	titre: String;
	description: String;
	url: String;
	tags: [String];
	creation: Date;
	visible: Boolean;
	views: Number;
	likes: Number;
	category: String;
	imageUrl: String;
}
