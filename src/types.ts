
export interface ISectionDetail {
    id: number;
    title: string;
    children?: ISectionDetail[];
}

export interface ISectionDetailQueryResult extends ISectionDetail {
    query: string;
    isExactMatch: boolean;
    hasMatchedChild: boolean;
    children?: ISectionDetailQueryResult[]
}