import React from 'react';
import objectPath from 'object-path';

import blogPosts from './../blog.json';

export default class BlogHome extends React.Component {
    render() {
        let blogPostSnippetElements = Object.keys(blogPosts).map((blogPostKey) => {
            return this.buildBlogPostSnippet(blogPostKey, blogPosts[blogPostKey]);
        });

        return (
            <section className="blog-home">
                {blogPostSnippetElements}
            </section>
        );
    }

    buildBlogPostSnippet(blogPostKey, blogPost) {
        let shouldDisplayPost = objectPath.has(blogPost, 'meta.title');

        if(shouldDisplayPost) {
            return (
                <article key={blogPostKey}>
                    <h3>{blogPost.meta.title}</h3>
                </article>
            );
        } else {
            return false;
        }
    }
}