<meta>
{
    "tags": ["SVG"],
    "title": "A Problem with SVGs and How to Avoid It"
}
</meta>

# A Problem with SVGs and How to Avoid it

I found an interesting bug while trying to find an easy to use SVG solution alternatives at work. I'd like to take you on the trip I went on while trying to solve a problem, in order to get the full scope of this super niche issue.

## SVG and how it *shouldn't* be implemented

Scalable Vector Graphics (SVGs) are an awesome bit of technology that allows you to use vector files in your HTML and CSS, instead of raster images. This gives you the flexibility of being able to resize elements using SVGs without having to worry about them looking pixelated. However they are notoriously annoying to work with. Not *difficult* to work with, just... annoying! There's a litany of references as far as how SVGs should be implemented on front end development blogs across the web, and yet they are rarely consistent. This is mainly surprising because SVGs have been around for several years now. I remember implementing them as early as 2013, and I'm sure that their actual tech spec dates back much farther than that.

One of the first widely implemented way to use SVGs was demonstrated by famed developer [Chris Coyier](https://twitter.com/chriscoyier) on [CSSTricks](https://css-tricks.com/using-svg/). This article is still on the first page of google results when searching for "SVG", and understandably so. Now, I'm not going to say anything bad about Chris, he's obviously a huge figure in the front end developer community. But this article has probably led to some of the worst implementations of SVG that exist on the web. In this article he states that a good solution for SVGs as background images is to encode them in BASE-64 and then put them in your CSS. There's a huge problem with this though. Well... several actually. The first is that the very purpose of encoding things as BASE-64 is to save on performance. Your BASE-64 should be smaller than the original file. This can often not be the case. The second issue is that it causes your CSS to look like crap. Having a big block of robotic moon-speak in the middle of your stylesheet is extremely unsettling, in contrast to the clean code I'm sure everyone has written around it. The last and secretly most insidious issue, arises when you start using this technique with a preprocessor like LESS or SASS.

Let's say you want to start using SVGs, in your nifty new preprocessor language that you've started to use, but maybe haven't gotten a full grasp on how either work yet. So you stumble upon this aforementioned article, and decide to put that android-babble into a variable in your stylesheet. Maybe, because you're a bit more advanced, you want to put it in a mixin. Let's say that this is for a commonly used icon, and you proceed to reference that variable or mixin all over the place, and your code looks much cleaner than if you were to try and put a big block of garbage all over the place. And you smile at how clean your code looks, compile your stylesheet, and give yourself a pat on the back for how good of a job you've done.

Except, that block of garbage can't get "referenced" in your compiled CSS now, it needs to be put in every place you want that SVG to show up. Every... single... place. If you do exactly what I just mentioned, there's no shame in it. It's a totally understandable mistake, but yeah you might want to fix that. If you make this mistake, your unwittingly getting rid of one of the best benefits of SVG: performance. Instead, you're clogging up your style request with all of this BASE-64 nonsense.

## How SVGs *should* be implemented

Now, this is one particular bad way to implement this, but how can we fix it, and what are some other solutions? SVGs are very flexible in the way of how they can be implemented, and like I've said, there is little consistency on which way is best. In my mind, there are two ways that an SVG can and should be implemented, and they both have their benefit. The first is to use them inline. SVGs can be injected directly into your markup. This allows you the added benefit of being able to dynamicly manipulate them. Once an SVG is inline, you can think of it as being drawn when the page is being painted by the browser, but it can be updated via CSS as well. A simple example of this having an icon, that once hovered over, will change the fill color from blue to red.

```HTML
<!-- in your HTML -->
	<svg>
		<path></path> <!-- part of your svg icon -->
		.
		.
		.
	</svg>
```

```SASS
	 //In your Stylesheet (sass in this example)
	svg {
		path {
			fill: blue;
		}

		&: hover {
			path {
				fill: red;
			}
		}
	}

```