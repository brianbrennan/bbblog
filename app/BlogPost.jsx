import React from 'react';
import moment from 'moment';

import blogPosts from './../blog.json';

export default class BlogPost extends React.Component {
    constructor(props) {
        super(props);
        this.blogPost = blogPosts[this.props.match.params.blog_post_title];
    }

    render() {
        let tagElements = this.blogPost.meta.tags.map((tag) => {
            return <div className="blog-post-tag" key={tag}>{tag}</div>
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="blog-post-content col-lg-8 col-lg-offset-2 col-xs-12">
                        <h1 className="blog-post-title">{this.blogPost.meta.title}</h1>
                        <h4 className="blog-post-publish-date">
                            {moment(this.blogPost.meta.publishDate).format('MM.DD.YYYY')}</h4>
                        <div className="blog-post-tags">
                            {tagElements}
                        </div>
                        <article className="content"
                                 dangerouslySetInnerHTML={{__html: this.blogPost.content}}>

                        </article>
                    </div>
                </div>
            </div>
        );
    }
}