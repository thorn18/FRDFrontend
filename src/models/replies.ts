import Reply from "./reply";

export default interface Replies{
    pageSize: number,
    items : [],
    offset: number,
    hasNext: boolean,
    totalCount: number,
}