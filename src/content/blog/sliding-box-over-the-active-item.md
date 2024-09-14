---
title: 'Sliding box over the active item'
isDraft: false
pubDate: 2024-09-09
author: 'andrej_forgac'
metaImage: 'sliding-box.webp'
image: 'sliding-box-gif.gif'
tags: ['react', 'typescript', 'css']
slug: sliding-box-over-the-active-item
stackblitzProjectId: 'andrejground-react-sliding-box'
---

In this article we'll go step by step into how to create a sliding box effect over the active element in a list. Not only that, we will create a custom hook which we can then reuse and overuse as we usually do.

<p class="highlight">No time to read, just show me the <a href="https://stackblitz.com/edit/andrejground-react-sliding-box" target="_blank">code &#8599;</a><p>

## What is this effect about

This effect is often used in tabs, navigation links, table of contents etc, some of which you can already see on this blog.
Why would we use this on our website/app? Well, people want to ride the trend and it just looks cool.

Once the implementation logic is in place, the rest is on our CSS imagination, for instance, we can add different styles to the active element, like `border`, or only `border-bottom` - like the main navigation in this blog , `background-color` - like the one in the demo, or combine all of these (and the others) - like in the table of contents in this blog.

## How it works

This sliding box is just an absolute positioned pseudo-element (`::before` or `::after`) which takes the size and position of the active element.

This implementation takes the `width`, `height`, `offsetLeft` and `offsetRight` from the active element and passes them via inline `style` to the list element as CSS variables `--width`, `--height`, `--x`, `--y`.

Now when changing the active element, these few lines are doing the magic:

```css
.list::after {
  /* ... */
  width: var(--width, 0);
  height: var(--height, 0);
  transform: translate(var(--x), var(--y));
  /* ... */
}
```

Let's break this in a couple of steps and see how they fit together.

## Starting a new react project

This is totally optional, you can use any of your existing react projects or a playground like <a href="https://stackblitz.com/" target="_blank">stackblitz &#8599;</a>

If you do want to create a new project from scratch, you can follow the steps in <a href="/articles/set-up-react-tailwind-typescript-in-vite" target="_blank">this article &#8599;</a>

<p class="highlight"><b>Tailwind CSS</b> is not required here, though we're using it for the convenience, but we will also be using <b>react css modules</b> for styling the list and the sliding box.</p>

## CSS module for the list and the sliding box

Let's add all the necessary styles which will make this effect possible.

```css
/* List.module.css */

/* Sliding box container */
.list {
  /* Required */
  position: relative; /* recommended - not required */

  /* Optional */
  width: fit-content;
  display: flex;
  flex-flow: row;
  margin-inline: auto;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  max-width: 600px;
}

/* The sliding box */
.list::after {
  /* Required */
  content: '';
  position: absolute;
  transform: translate(var(--x), var(--y));
  width: var(--width);
  height: var(--height);
  z-index: -1;
  transition: all 250ms ease;
  inset: 0; /* or top-right-bottom-left of choice */

  /* Optional */
  background: rgb(102, 0, 255);
  border-radius: 6px;
}
```

## The `List` component

Now, we can create `List` component which will hold a couple of items (buttons) we'll be using for the demo.

When clicking the item, it becomes _active_ and the box slides over it.

Also we want this effect to work on a list with a dynamic number of items, so we'll add another button just for that purpose.

```tsx
/* List.tsx */

import { useState } from 'react';
import classes from './List.module.css';

const initialItems = ['home', 'about', 'contact'];

function List() {
  const [items, setItems] = useState(initialItems);
  const [activeItem, setActiveItem] = useState(items[0]);

  function onClick(item: string) {
    setActiveItem(item);
  }

  function onAddNewItem() {
    setItems(prev => [
      ...prev,
      `new item - ${prev.length - initialItems.length}`,
    ]);
  }

  return (
    <>
      <h2 className="text-center my-4">Sliding Box</h2>

      <hr />

      <button
        className="mt-4 mx-auto border rounded-lg block cursor-pointer p-2"
        onClick={onAddNewItem}
      >
        Add new item
      </button>

      <ul className={classes.list} style={boxSizeAndPosition}>
        {items.map(item => (
          <li key={item}>
            <button
              className="cursor-pointer p-2 hover:opacity-70 transition-opacity"
              onClick={() => onClick(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default List;
```

## Introducing `useSlidingBox` hook

Let's create a small todo here:

1. Create the hook
2. Add a state to keep track of the sliding box size (width, height) and position (offsetLeft, offsetTop).
3. Add references to all the elements we want to slide over.
4. Add a reference to the active element.
5. Add logic for making them all work together.
6. Lastly, plug and play.

### 1. Create the hook

In the `hooks` folder we'll create `useSlidingBox.ts` file, which will contain the hook.

The hook will accept a configuration object with two properties:

- `activeItem` - a value that identifies the active element
- `recalculate` - a list of values we will be watching. Whenever any of these values change, we will recalculate all sizes and positions of the elements in the list.

```ts
/* useSlidingBox.ts */

export default function useSlidingBox({
  activeItem,
  recalculate = [],
}: {
  activeItem: string;
  recalculate?: unknown[];
}) {
  // ...
}
```

### 2. `boxSizeAndPosition` _state_

First, let's see what type this state is going to be. In order to pass this to the `style` property of our `List`, this state needs to take shape of a style object with CSS properties. So that is exactly where we are going to start from.

```ts
interface BoxSizeAndPosition extends CSSProperties {
  '--x': `${number}px`;
  '--y': `${number}px`;
  '--width': `${number}px`;
  '--height': `${number}px`;
}
```

As you see, we're using template literal types to enforce the value in `px`.

Now we can create the initial state

```ts
const initialBoxSizeAndPosition: BoxSizeAndPosition = {
  '--x': '0px',
  '--y': '0px',
  '--width': '0px',
  '--height': '0px',
};
```

... and finally add the state to the hook

```ts
/* useSlidingBox.ts */

interface BoxSizeAndPosition extends CSSProperties {
  '--x': `${number}px`;
  '--y': `${number}px`;
  '--width': `${number}px`;
  '--height': `${number}px`;
}

const initialBoxSizeAndPosition: BoxSizeAndPosition = {
  '--x': '0px',
  '--y': '0px',
  '--width': '0px',
  '--height': '0px',
};

export default function useSlidingBox({
  activeItem,
  recalculate = [],
}: {
  activeItem: string;
  recalculate?: unknown[];
}) {
  const [boxSizeAndPosition, setBoxSizeAndPosition] = useState(
    initialBoxSizeAndPosition,
  );
}
```

With this, our type-safe state is ready.

### 3. `allElementsRef` _ref_

For this, we're going to use the `useRef` hook but not in a way that we usually do. This _ref_ will hold an object with a unique identifier as a <b>key</b> and the actual HTML element as a <b>value</b>.

So as usual, let's get the types out of the way first.

To allow for a maximum type accuracy, the hook will accept a _generic_ type which we will use for the elements in the list. If no type is explicitly provided to the hook, we still have a type that extends `HTMLElement`.

Now the hook will look something like this:

```ts
/* useSlidingBox.ts */

// ...

export default function useSlidingBox<ItemElement extends HTMLElement>(
  {
    // ...
  },
) {
  // ...
}
```

`AllElements` type is also going to be a generic. It will make use of the `ItemElement` type. Now we have it all connected.

```ts
/* useSlidingBox.ts */

// ...

type AllElements<T> = { [key: PropertyKey]: T };

export default function useSlidingBox<ItemElement extends HTMLElement>(
  {
    // ...
  },
) {
  // ...
  const allElementsRef: MutableRefObject<AllElements<ItemElement>> = useRef({});
}
```

<p class='highlight'>We are using <b>MutableRefObject</b> because we don't want the TS to complain about the non-traditional way we're going to attach our refs to the elements in the list.</p>

### 4. Glue 'em together

#### 4.a Save sizes and positions

We will save this in `itemPositions` object outside of the hook and create the `mapAllPositions` function that accepts the list of all the elements and maps them into the object.

For `itemKey`, we need the same unique identifier we use for the _active item_. To achieve that we will be attaching this value to all the elements in the list using the `data-key` attribute.

```ts
const itemPositions: Record<string, BoxSizeAndPosition> = {};

const mapAllPositions = (items: HTMLElement[]) => {
  items.forEach(item => {
    const itemKey = item.dataset.key;
    if (!itemKey) return;

    const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = item;
    const itemPosition: BoxSizeAndPosition = {
      '--x': `${Math.round(offsetLeft)}px`,
      '--y': `${Math.round(offsetTop)}px`,
      '--width': `${Math.round(offsetWidth)}px`,
      '--height': `${Math.round(offsetHeight)}px`,
    };

    itemPositions[itemKey] = itemPosition;
  });
};
```

#### 4.b Set active box position

As we stated above, we will use the `activeItem` identifier to grab the size and position of the active element.

```ts
const setActivePosition = useCallback(() => {
  const activeItemPosition = itemPositions[activeItem];
  if (!activeItemPosition) return;

  setBoxSizeAndPosition(activeItemPosition);
}, [activeItem]);
```

<p class="highlight">Since we're dealing with potentially expensive operations of extracting <b>width</b>, <b>height</b>, <b>offsetLeft</b> and <b>offsetRight</b>, we will use a small optimisation tactics - <b>useCallback</b> and be careful about calling the expensive <b>mapAllPositions</b> function.
<br /> <br />
We don't necessarily want to calculate everything each time the active item changes. We just grab cached values from the <code>itemPositions</code> object.
</p>

#### 4.c Calculate, save and set the active box

To do this, we take all the items in the list, calculate sizes and positions, and lastly set the active box size and position.

```ts
const mapAndSetActivePosition = useCallback(() => {
  if (!allElementsRef.current) return;

  const allItems = Object.values(allElementsRef.current);
  mapAllPositions(allItems);
  setActivePosition();
}, [setActivePosition, ...recalculate]);
```

#### 4.d The logic to control all these pieces

Here we create the logic for when to only set the active box, when to calculate everything and set the active box, and we will add a `resize` event listener so that we don't lose positions when the screen size changes for any reason.

```ts
useEffect(setActivePosition, [activeItem]); // set the active box
useEffect(mapAndSetActivePosition, [...recalculate]); // calc and set the active box
useEffect(() => {
  //calc and set on screen size change
  window.addEventListener('resize', mapAndSetActivePosition);
  return () => window.removeEventListener('resize', mapAndSetActivePosition);
}, [mapAndSetActivePosition]);
```

#### 4.e The hook is ready

Our hook returns an object with `allElementsRef` and `boxSizeAndPosition`, and now it looks like this

```ts
/* useSlidingBox.ts */

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  CSSProperties,
  MutableRefObject,
} from 'react';

type AllElements<T> = { [key: PropertyKey]: T };

interface BoxSizeAndPosition extends CSSProperties {
  '--x': `${number}px`;
  '--y': `${number}px`;
  '--width': `${number}px`;
  '--height': `${number}px`;
}

const initialBoxSizeAndPosition: BoxSizeAndPosition = {
  '--x': '0px',
  '--y': '0px',
  '--width': '0px',
  '--height': '0px',
};

const itemPositions: Record<string, BoxSizeAndPosition> = {};

const mapAllPositions = (items: HTMLElement[]) => {
  items.forEach(item => {
    const itemKey = item.dataset.key;
    if (!itemKey) return;

    const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = item;
    const itemPosition: BoxSizeAndPosition = {
      '--x': `${Math.round(offsetLeft)}px`,
      '--y': `${Math.round(offsetTop)}px`,
      '--width': `${Math.round(offsetWidth)}px`,
      '--height': `${Math.round(offsetHeight)}px`,
    };

    itemPositions[itemKey] = itemPosition;
  });
};

type SlidingBox<Item> = {
  allElementsRef: MutableRefObject<AllElements<Item>>;
  boxSizeAndPosition: BoxSizeAndPosition;
};

export default function useSlidingBox<ItemElement extends HTMLElement>({
  activeItem,
  recalculate = [],
}: {
  activeItem: string | null | undefined;
  recalculate?: unknown[];
}): SlidingBox<ItemElement> {
  const [boxSizeAndPosition, setBoxSizeAndPosition] = useState(
    initialBoxSizeAndPosition,
  );
  const allElementsRef: MutableRefObject<AllElements<ItemElement>> = useRef({});

  const setActivePosition = useCallback(() => {
    if (!activeItem) return;

    const activeItemPosition = itemPositions[activeItem];
    if (!activeItemPosition) return;

    setBoxSizeAndPosition(activeItemPosition);
  }, [activeItem]);

  const mapAndSetActivePosition = useCallback(() => {
    if (!allElementsRef.current) return;

    const allItems = Object.values(allElementsRef.current);
    mapAllPositions(allItems);
    setActivePosition();
  }, [setActivePosition, ...recalculate]);

  useEffect(setActivePosition, [activeItem]);
  useEffect(mapAndSetActivePosition, [...recalculate]);
  useEffect(() => {
    window.addEventListener('resize', mapAndSetActivePosition);
    return () => window.removeEventListener('resize', mapAndSetActivePosition);
  }, [mapAndSetActivePosition]);

  return { allElementsRef, boxSizeAndPosition };
}
```

## Plug and play

All we need to do now, is to use the hook inside the `List` component, namely, assign `boxSizeAndPosition` to inline _style_ property of the list element and attach the refs to the elements in the list.

First part is straight forward

```ts
const { allElementsRef, boxSizeAndPosition } = useSlidingBox({
  activeItem,
  recalculate: [items.length], // we want to recalculate in case our list changes
});
```

For the other part, we will pass the `data-key` and use a function to attach the refs to elements in the list.

```tsx
<ul
  className={classes.list} // -> apply the class from CSS module
  style={boxSizeAndPosition} // -> set --width, --height, --x and --y
>
  {items.map(item => (
    <li
      key={item}
      data-key={item} // -> a key in allItemsPositions object
      ref={node => {
        if (!node) return;

        allElementsRef.current[item] = node; // -> allItemsPositions[item]
      }}
    >
      <button
        className="cursor-pointer p-2 hover:opacity-70 transition-opacity"
        onClick={() => onClick(item)}
      >
        {item}
      </button>
    </li>
  ))}
</ul>
```

Now the `List` component is ready and it looks like this

```tsx
/* List.tsx */

import { useState } from 'react';
import useSlidingBox from '../hooks/useSlidingBox';
import classes from './List.module.css';

const initialItems = ['home', 'about', 'contact'];

function List() {
  const [items, setItems] = useState(initialItems);
  const [activeItem, setActiveItem] = useState(items[0]);
  const { allElementsRef, boxSizeAndPosition } = useSlidingBox({
    activeItem,
    recalculate: [items.length],
  });

  function onClick(item: string) {
    setActiveItem(item);
  }

  function onAddNewItem() {
    setItems(prev => [
      ...prev,
      `new item - ${prev.length - initialItems.length}`,
    ]);
  }

  return (
    <>
      <h2 className="text-center my-4">Sliding Box</h2>

      <hr />

      <button
        className="mt-4 mx-auto border rounded-lg block cursor-pointer p-2"
        onClick={onAddNewItem}
      >
        Add new item
      </button>

      <ul className={classes.list} style={boxSizeAndPosition}>
        {items.map(item => (
          <li
            key={item}
            data-key={item}
            ref={node => {
              if (!node) return;

              allElementsRef.current[item] = node;
            }}
          >
            <button
              className="cursor-pointer p-2 hover:opacity-70 transition-opacity"
              onClick={() => onClick(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default List;
```

To see it in action, we just need to add the `List` component to `App.tsx`

```tsx
/* App.tsx */

import './App.css';
import List from './components/List';

function App() {
  return (
    <>
      <List />
    </>
  );
}

export default App;
```

We're done!