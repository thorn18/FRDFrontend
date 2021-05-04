import Reply from "./reply";

export default interface Replies{
    pageSize: number,
    items : Reply[],
    offset: number,
    hasNext: boolean,
    totalCount: number,
}