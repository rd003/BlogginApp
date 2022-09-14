export interface BlogModel{
    id:number,
    publishedDate:string,
    isPublished:boolean,
    isDeleted:boolean,
    categoryId:number,
    blogTitle:string,
    blogContent:string,
    authorUsername:string,
    authorName:string,
    categoryName:string
}