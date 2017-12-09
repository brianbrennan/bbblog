import React from 'react';
import { Link } from 'react-router-dom';
import objectPath from 'object-path';

import blogPosts from './../blog.json';

export default class BlogHome extends React.Component {
    render() {
        let blogPostSnippetElements = Object.keys(blogPosts)
            .sort((blogPostTitleA, blogPostTitleB) => {
                let dateA = new Date(blogPosts[blogPostTitleA].meta.publishDate).getMilliseconds(),
                    dateB = new Date(blogPosts[blogPostTitleB].meta.publishDate).getMilliseconds();

                if(dateA < dateB) {
                    return -1;
                } else if (dateA > dateB) {
                    return 1;
                }

                return 0;
            })
            .map((blogPostKey) => {
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
                <Link key={blogPostKey} to={'/' + blogPostKey}>
                    <article >
                        <h3>{blogPost.meta.title}</h3>
                    </article>
                </Link>
            );
        } else {
            return false;
        }
    }
}