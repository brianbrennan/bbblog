import React from 'react';

import blogPosts from './../blog.json';

export default class BlogPost extends React.Component {
    constructor(props) {
        super(props);
        this.blogPost = blogPosts[this.props.match.params.blog_post_title];
    }

    render() {
        return (
            <article className="content" dangerouslySetInnerHTML={{__html: this.blogPost.content}}>

            </article>
        );
    }
}