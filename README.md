# get-element-relative-offset

This package exports a function to find the position of a DOM element relative to another.

```js
import getElementRelativeOffset from 'get-element-relative-offset';

getElementRelativeOffset(
    baseElement: HTMLElement,
    // Return true if an element is the one you want to be relative to.
    to: (parent: HTMLElement) => boolean
): {
    top: number,
    left: number,
    bottom: number,
    right: number
}
```
