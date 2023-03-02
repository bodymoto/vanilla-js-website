## https://www.helloevan.dev/
<img src="../main/img/tab-icon/hedev-logo-white.png" width=136 height=72>

## *This repo represents a milestone in my progression as a developer. I have since moved on to more challenging work. Please visit my latest repo for a more up-to-date picture. Thank you.*

The site was built using a vanilla-only HTML/CSS/JavaScript approach - no libraries, frameworks, bundlers etc. It is responsive, mobile-friendly, and interactive. It has three pages: ```home``` ```contact``` ```resume```. The contact form uses https://formspree.io/ to execute submissions. It is live hosted on GitHub, protected by TLS.

Some notable work includes:

1. An interactive navigation bar that drops down as the user scrolls-up. Also, a throttle triggers while scrolling to help minimize the amount of events firing in the browser, improving performance.
2. Custom animations trigger as you scroll. The animation fires based on the position of the element relative to the user's screen position. This means the adding new elements to the site will not break the event.
3. A unique "square veil" opens up and disappears when a button is clicked. It vanishes by removing each element one-by-one via async/await. I've yet to witness anything like it elsewhere.
4. DOM manipulation exists, of course. Gotta love the DOM.
5. And the site's logo was crafted using HTML/CSS in the browser. I then screenshot it and made my final edits in GIMP.

Again - vanilla JavaScript only! Cheers!
