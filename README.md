## [HelloEvan.dev](https://www.helloevan.dev/)
<img src="../main/img/tab-icon/hedev-logo-white.png" width=136 height=72>

The site was built using a vanilla-only HTML/CSS/JavaScript approach - no libraries, frameworks, bundlers etc. It is responsive, mobile-friendly, and interactive. It has three pages: ```home``` ```contact``` ```resume```. The contact form uses [Formspree](https://formspree.io/) to execute submissions. It is live hosted on GitHub, protected by TLS.

Some notable work includes:

1. An interactive navigation bar that drops down as the user scrolls-up. Also, a throttle triggers while scrolling to help minimize the amount of events firing in the browser, improving performance.
2. Custom animations trigger as you scroll. The animation fires based on the position of the element relative to the user's screen position. This means adding new elements to the site will not break previous events.
3. A unique featured veil disappears when a button is clicked, further down the page. It vanishes by removing each element one-by-one via JavaScript's async/await. I've yet to witness anything like it elsewhere.
4. DOM element manipulation.
5. The site's logo was crafted using HTML/CSS in the browser. Final edits in GIMP.
