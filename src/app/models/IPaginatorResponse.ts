export interface IPaginatorResponse{
    currentPage: number,
    totalPages: number,
    pageSize: number,
    hasPrevious: boolean,
    hasNext: boolean,
    totalCount:number
}