import { ISectionDetail, ISectionDetailQueryResult } from '../src/types';
import { querySection } from '../src/util';

describe('querySection', () => {
    let data: ISectionDetail;

    beforeEach(() => {
        data = {
            id: 1,
            title: 'Parent',
            children: [
                {
                    id: 2,
                    title: 'Child 1',
                    children: [
                        {
                            id: 3,
                            title: 'Grandchild 1'
                        },
                        {
                            id: 4,
                            title: 'Grandchild 2'
                        }
                    ]
                },
                {
                    id: 5,
                    title: 'Child 2'
                }
            ]
        };
    });

    it('should return isExactMatch=true for direct matches', () => {
        const result: ISectionDetailQueryResult = querySection(data, 'Parent');
        expect(result.isExactMatch).toBe(true);
    });

    it('should return isExactMatch=false for non-matches', () => {
        const result: ISectionDetailQueryResult = querySection(data, 'NonExistent');
        expect(result.isExactMatch).toBe(false);
    });

    it('should return hasMatchedChild=true when a child section matches', () => {
        const result: ISectionDetailQueryResult = querySection(data, 'Child 1');
        expect(result.hasMatchedChild).toBe(true);
    });

    it('should return hasMatchedChild=false when no child section matches', () => {
        const result: ISectionDetailQueryResult = querySection(data, 'NonExistent');
        expect(result.hasMatchedChild).toBe(false);
    });

    it('should work with nested children', () => {
        const result: ISectionDetailQueryResult = querySection(data, 'Grandchild 1');
        expect(result.hasMatchedChild).toBe(true);
        expect(result.children![0].hasMatchedChild).toBe(true);
    });

    it('should be case insensitive', () => {
        const result: ISectionDetailQueryResult = querySection(data, 'parent');
        expect(result.isExactMatch).toBe(true);
    });
});
