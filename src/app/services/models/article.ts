export interface IArticle {
    auteur: String;
	titre: String;
	description: String;
	category: String;
	url: String;
	tags: [String];
	creation: Date;
	visible: Boolean;
	views: Number;
	likes: Number;
	imageUrl: String;
}
