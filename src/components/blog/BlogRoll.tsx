import React from 'react';
import { Row } from 'react-bootstrap';

import BlogRollPost from './BlogRollPost';

export interface IBlogRoll {
    data: {
        allMarkdownRemark: {
            group: {
                fieldValue: string;
                totalCount: number;
            }[];
            nodes: any[];
        };
    };
}

const BlogRoll = (props: IBlogRoll) => {
    console.log(props);
    const { data } = props;
    const { nodes: posts } = data.allMarkdownRemark;

    return <Row className="mt-3">{posts && posts.map(post => <BlogRollPost key={post.id} post={post} />)}</Row>;
};

export default BlogRoll;