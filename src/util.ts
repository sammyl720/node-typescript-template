import { ISectionDetail, ISectionDetailQueryResult } from "./types";

export function getGreetingMessage(name: string) {
  return `Hello ${name}!`;
}
export function querySection(section: ISectionDetail, query: string): ISectionDetailQueryResult {
  // check if current section title includes query (case insensitive)
  const isExactMatch: boolean = section.title.toLowerCase().includes(query.toLowerCase());

  // check child sections, if any
  let children: ISectionDetailQueryResult[] | undefined = undefined;
  
  let hasMatchedChild: boolean = false;
  if (section.children) {
      children = section.children.map(child => querySection(child, query));
      // a section has a matched child if at least one child is an exact match
      hasMatchedChild = children.some(child => child.isExactMatch || child.hasMatchedChild);
  }

  // return result
  return {
      ...section,
      query: query,
      isExactMatch: isExactMatch,
      hasMatchedChild: hasMatchedChild,
      children: children
  };
}
