import React from 'react';
import _ from 'lodash';
import Link from 'next/link';
import { Row, Col, Button } from 'react-bootstrap';
import BlogPostTag from '../post/BlogPostTag';
import ITechnology from '../../technology/ITechnology';
import { IBlogListTemplate } from './BlogListTemplate';

interface IBlogListTagFilter extends IBlogListTemplate {
    technology: ITechnology;
}

export const BlogListTagFilter = (props: IBlogListTagFilter) => {
    const { tag, posts, technology } = props;
    const hasTag = tag !== undefined;

    if (!hasTag) {
        const allTagsUsed = [...new Set(_.flatten(posts.map((post) => post.tags)))] as string[];
        const tagsWithCount = allTagsUsed.map((tag) => ({
            tag,
            count: _.flatten(posts.map((post) => post.tags)).filter((tag) => tag === tag).length
        }));

        return (
            <Row className="mt-5">
                <Col>
                    <Row>
                        <Col>
                            <p className="small">Filter by Tag</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {tagsWithCount.map((tagWithCount, index) => (
                                <BlogPostTag key={index} tag={tagWithCount.tag} count={tagWithCount.count} tagLink={true} />
                            ))}
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    } else {
        return (
            <Row className="mt-5">
                <Col className="align-self-center">
                    <Link href="/blog">
                        <Button variant="primary">Remove Filter</Button>
                    </Link>
                </Col>
                {technology !== undefined && (
                    <Col className="align-self-center">
                        <Link href={`/technologies/${technology.type}/${technology.id}`}>
                            <Button variant="info">Info On This Tech</Button>
                        </Link>
                    </Col>
                )}
            </Row>
        );
    }
};

export default BlogListTagFilter;