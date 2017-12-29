import React from 'react';
import mojs from 'mo-js';

import firebaseDB from './firebasedb.js';

export default class LikeButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            likes: 0,
            hasLiked: localStorage.getItem(this.props.blogPostID)
        };

        this.burst = new mojs.Burst({
            left: 0, top: 0,
            radius:   { 4: RADIUS },
            angle:    45,
            count:    14,
            timeline: { delay: 300 },
            children: {
                radius:       2.5,
                fill:         [
                    { '#9EC9F5' : '#9ED8C6' },
                    { '#91D3F7' : '#9AE4CF' },

                    { '#DC93CF' : '#E3D36B' },
                    { '#CF8EEF' : '#CBEB98' },

                    { '#87E9C6' : '#1FCC93' },
                    { '#A7ECD0' : '#9AE4CF' },

                    { '#87E9C6' : '#A635D9' },
                    { '#D58EB3' : '#E0B6F5' },

                    { '#F48BA2' : '#CF8EEF' },
                    { '#91D3F7' : '#A635D9' },

                    { '#CF8EEF' : '#CBEB98' },
                    { '#87E9C6' : '#A635D9' }
                ],
                scale:        { 1: 0, easing: 'quad.in' },
                pathScale:    [ .8, null ],
                degreeShift:  [ 13, null ],
                duration:     [ 500, 700 ],
                easing:       'quint.out'
            }
        });

        this.heart = new mojs.Shape({
            left: 0, top: 2,
            shape:    'heart',
            fill:     '#E5214A',
            scale:    { 0 : 1 },
            easing:   'elastic.out',
            duration: 1000,
            delay:    300,
            radius:   11
        });

        this.likeBlogPost = this.likeBlogPost.bind(this);
        this.unlikeBlogPost = this.unlikeBlogPost.bind(this);

        firebaseDB.listeners[this.props.blogPostID].on('value', (snapshot) => {
            this.setState({
                likes: snapshot.val()
            });
        });
    }

    componentDidMount() {
        firebaseDB.getLikes(this.props.blogPostID)
            .then((likes) => {
                this.setState({
                    likes: likes
                });
            });
    }

    render() {
        let hasLikedClass = this.state.hasLiked ? ' hasLiked' : '';

        return (
            <button className={'blog-post-like-button' + hasLikedClass}
                    onClick={
                                this.state.hasLiked ? this.unlikeBlogPost : this.likeBlogPost
                            }>
                {this.state.likes} {Heart.getShape}
            </button>
        );
    }

    likeBlogPost(e) {
        firebaseDB.likeBlogPost(this.state.blogPostID);
        localStorage.setItem(this.state.blogPostID, true);
        this.setState({
            hasLiked: true
        });
        this.animateBurst(e);
    }

    unlikeBlogPost() {
        firebaseDB.unlikeBlogPost(this.state.blogPostID);
        localStorage.removeItem(this.state.blogPostID);
        this.setState({
            hasLiked: false
        });
    }

    animateBurst(e) {
        const coords = { x: e.pageX, y: e.pageY };
        this.burst
            .tune(coords)
            .replay();

        circle
            .tune( coords )
            .replay();

        this.heart
            .tune( coords )
            .replay();
    }
}

class Heart extends mojs.CustomShape {
    getShape () {
        return '<path d="M73.6170213,0 C64.4680851,0 56.5957447,5.53191489 51.7021277,13.8297872 C50.8510638,15.3191489 48.9361702,15.3191489 48.0851064,13.8297872 C43.4042553,5.53191489 35.3191489,0 26.1702128,0 C11.9148936,0 0,14.0425532 0,31.2765957 C0,48.0851064 14.893617,77.8723404 47.6595745,99.3617021 C49.1489362,100.212766 50.8510638,100.212766 52.1276596,99.3617021 C83.8297872,78.5106383 99.787234,48.2978723 99.787234,31.2765957 C100,14.0425532 88.0851064,0 73.6170213,0 L73.6170213,0 Z"></path>';
    }
}
mojs.addShape( 'heart', Heart );

const CIRCLE_RADIUS = 20;
const RADIUS = 32;
const circle = new mojs.Shape({
    left: 0, top: 0,
    stroke:   { '#E5214A' : '#CC8EF5' },
    strokeWidth: { [2*CIRCLE_RADIUS] : 0 },
    fill:       'none',
    scale:      { 0: 1 },
    radius:     CIRCLE_RADIUS,
    duration:   400,
    easing:     'cubic.out'
});
