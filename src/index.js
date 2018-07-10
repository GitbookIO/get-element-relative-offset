/* @flow */

type Offset = {
    top: number,
    left: number,
    bottom: number,
    right: number
};

/*
 * Get top and left offset of an element relative to another.
 * The "parent" must be a positionned element.
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop
 */
function getElementOffset(
    baseElement: HTMLElement,
    to: (parent: HTMLElement) => boolean
): Offset {
    const offsetAcc = { top: 0, left: 0, right: 0, bottom: 0 };

    function getElementOffsetAux(el: HTMLElement): Offset {
        if (to(el) || !el.offsetParent) {
            // Found the final parent
            offsetAcc.right =
                el.offsetWidth - (offsetAcc.left + baseElement.offsetWidth);
            offsetAcc.bottom =
                el.offsetHeight - (offsetAcc.top + baseElement.offsetHeight);
            return offsetAcc;
        }

        // Add this element offset
        // The final offset is the sum of each element's offsets

        /*
          +------------------------------------------+
          | PARENT       +                           |
          |              |                           |
          |              |offsetTop                  |
          |              |                           |
          |              v          offsetWidth      |
          |  +---------->  +--------------------->   |
          |  offsetLeft  + +---------------------+   |
          |              | | ELEMENT             |   |
          |              | |                     |   |
          |              | |                     |   |
          |              | |                     |   |
          | offsetHeight | |                     |   |
          |              | |                     |   |
          |              v +---------------------+   |
          |                                          |
          +------------------------------------------+
        */

        offsetAcc.top += el.offsetTop;
        offsetAcc.left += el.offsetLeft;

        // $FlowFixMe: offsetParent is an Element but can be considered as an HTMLElement
        return getElementOffsetAux(el.offsetParent);
    }

    return getElementOffsetAux(baseElement);
}

export default getElementOffset;
