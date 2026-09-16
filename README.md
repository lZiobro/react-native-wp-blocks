# React Native WordPress Blocks

WordPress in the palm of your hand. A powerful and flexible package to parse your WordPress posts into React Native components. Deliver a native reading experience to your users with customizable block components, primitive overrides, dynamic HTML rendering, and rich theming.

## Features

- **Out-of-the-box support** for standard WordPress core blocks
- **Primitive component overrides** (`Text`, `View`, `Image`) to seamlessly fit your app's UI kit
- **Flexible theming** with custom tokens and automatic style parsing
- **Extensible block & HTML renderer mapping** for custom Gutenberg blocks and HTML tags
- **Performance optimized** AST-based HTML parsing & block rendering
- **TypeScript ready** with full type safety

---

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage Guide](#usage-guide)
  - [1. Configuring the Provider](#1-configuring-the-provider)
    - [Primitive Components](#primitive-components)
    - [Theme Customization](#theme-customization)
    - [Custom Provider Wrapper Example](#custom-provider-wrapper-example)
  - [2. Displaying Content](#2-displaying-content)
  - [3. Overwriting Built-in Blocks](#3-overwriting-built-in-blocks)
    - [Deep Dive: Customizing ColumnBlock](#deep-dive-customizing-columnblock)
  - [4. Handling Custom Gutenberg & Plugin Blocks](#4-handling-custom-gutenberg--plugin-blocks)
  - [5. Custom HTML Tag Renderers](#5-custom-html-tag-renderers)
- [Handling Embeds](#handling-embeds)
  - [Recommended Strategy: Native / oEmbed Handlers](#recommended-strategy-native--oembed-handlers)
    - [Spotify oEmbed Example](#spotify-oembed-example)
- [Supported Core Blocks](#supported-core-blocks)
  - [Design](#design)
  - [Embed](#embed)
  - [Media](#media)
  - [Reusable](#reusable)
  - [Text](#text)
  - [Widgets & Custom](#widgets--custom)
- [License](#license)

---

## Requirements

Your WordPress REST API should expose post blocks in standard Gutenberg format (such as via [wp-blocks-rest-api](https://github.com/lZiobro/wp-blocks-rest-api)).

---

## Installation

Install `react-native-wp-blocks` via npm:

```bash
npm install react-native-wp-blocks
```

or yarn:

```bash
yarn add react-native-wp-blocks
```

---

## Quick Start

```javascript
import React from 'react';
import { WordPressContent, WordPressProvider } from 'react-native-wp-blocks';

const blocks = [
  {
    blockName: 'core/paragraph',
    attrs: {},
    innerBlocks: [],
    innerHTML: '<p>Hello World!</p>',
  },
];

export const WordPressPost = () => {
  return (
    <WordPressProvider>
      <WordPressContent blocks={blocks} />
    </WordPressProvider>
  );
};
```

---

## Usage Guide

### 1. Configuring the Provider

Configure `WordPressProvider` at your app root or screen level. You can supply custom primitives, theme values, custom block components, and HTML renderers.

#### Primitive Components

Primitives replace standard React Native elements throughout the package. Pass your own styled text or view components (e.g. from styled-components, Tamagui, or custom UI kits):

```javascript
const primitives = {
  Text: StyledText,
  View: StyledView,
  Image: CustomImage,
};
```

#### Theme Customization

Adjust design tokens to match your application palette and typography scale:

```javascript
const wpTheme: WordPressContextTheme = {
  // 'theme.text_color': 'white', // no need to set the color here if you have provided a custom Text primitive
  'theme.border_color': '#E0E0E0',
  'theme.link_color': '#0066CC',
  'theme.background_accent_1': '#F5F5F5',
  'theme.background_accent_2': '#E5E5E5',
};
```

#### Custom Provider Wrapper Example

Here is a complete pattern for wrapping `WordPressProvider` with your app's configuration:

```typescript
import React, { type ReactNode } from 'react';
import { StyledText } from '../../_common/ui/StyledText';
import {
  type BlockComponentProps,
  WordPressBlockName,
  type WordPressComponentProps,
  type WordPressContextPrimitives,
  type WordPressContextTheme,
  WordPressProvider as Provider,
} from 'react-native-wp-blocks';

const htmlRenderers: Record<
  string,
  React.ComponentType<WordPressComponentProps>
> = {
  bdo: () => <React.Fragment />,
  math: () => <React.Fragment />,
};

const wpBlockComponents: Record<
  string | WordPressBlockName,
  React.ComponentType<BlockComponentProps>
> = {
  'core/math': () => <React.Fragment />,
};

const wpTheme: WordPressContextTheme = {
  // 'theme.text_color': 'white', // no need to set the color here if you have provided Text primitive
  'theme.border_color': '#E0E0E0',
  'theme.link_color': '#0066CC',
};

const primitives: Partial<WordPressContextPrimitives> = {
  Text: StyledText,
};

export const WordPressProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider
      primitives={primitives}
      blocks={wpBlockComponents}
      htmlRenderers={htmlRenderers}
      theme={wpTheme}
    >
      {children}
    </Provider>
  );
};
```

---

### 2. Displaying Content

- **`WordPressContent`**: Wraps the parsed block array inside a React Native `FlatList` for virtualized list performance.
- **`WordPressBlockSelector`**: Can be used directly if you prefer placing blocks in a custom container (such as a `ScrollView` or layout `View`).

```typescript
import React from 'react';
import { ScrollView } from 'react-native';
import { WordPressBlockSelector } from 'react-native-wp-blocks';

export const ScrollablePost = ({ blocks }) => (
  <ScrollView>
    {blocks.map((block, index) => (
      <WordPressBlockSelector key={index} wpBlock={block} index={index} />
    ))}
  </ScrollView>
);
```

---

### 3. Overwriting Built-in Blocks

You can replace any default block implementation with a custom component.

#### Deep Dive: Customizing `ColumnBlock`

By default, `ColumnBlock` applies `flexBasis` when a `width` attribute exists:

```typescript
export const ColumnBlock = ({ wpBlock, children }: BlockComponentProps) => {
  const { primitives, styles } = useWordPressContext();

  const ViewComponent = primitives.View;
  const widthAttr = wpBlock.attrs?.width;

  return (
    <ViewComponent
      style={[widthAttr ? { flexBasis: widthAttr } : {}, styles.ColumnBlock]}
    >
      {children}
    </ViewComponent>
  );
};
```

If your mobile design system calls for full-width columns or custom responsive flex layouts, you can override `ColumnBlock` entirely:

```typescript
export const CustomColumnBlock = ({ children }: BlockComponentProps) => {
  const { primitives, styles } = useWordPressContext();

  const ViewComponent = primitives.View;

  return <ViewComponent style={styles.ColumnBlock}>{children}</ViewComponent>;
};

const wpBlockComponents: Record<
  string | WordPressBlockName,
  React.ComponentType<BlockComponentProps>
> = {
  [WordPressBlockName.COLUMN]: CustomColumnBlock,
};

export const WordPressProvider = ({ children }: { children: ReactNode }) => {
  return <Provider blocks={wpBlockComponents}>{children}</Provider>;
};
```

---

### 4. Handling Custom Gutenberg & Plugin Blocks

Handling custom WordPress plugin blocks (or third-party Gutenberg blocks) follows the exact same pattern as block overrides. Simply pass the block slug string (instead of the `WordPressBlockName` enum) to the `blocks` map:

```typescript
const customBlocks = {
  'my-plugin/custom-cta': CustomCtaBlockComponent,
};
```

---

### 5. Custom HTML Tag Renderers

HTML content inside blocks (like paragraph HTML or freeform content) is parsed into an AST and rendered by HTML tag components in `htmlRenderers`.

For example, `WpBr` uses `lineHeight` on the `Text` primitive to guarantee clean vertical spacing:

```typescript
export const WpBr = () => {
  const { primitives, styles } = useWordPressContext();

  const TextComponent = primitives.Text;

  return <TextComponent style={styles.WpBr}>{'\n'}</TextComponent>;
};
```

You can supply custom tag handlers (e.g. for `<a>`, `<img>`, `<table>`, or custom elements) in `htmlRenderers`:

```typescript
const htmlRenderers = {
  a: ({ element, children }: WordPressComponentProps) => (
    <CustomLink href={element.attribs?.href}>{children}</CustomLink>
  ),
};
```

---

## Handling Embeds

Embed blocks (`core/embed`) are quite tricky to handle on mobile devices. While embedding an `iframe` via `react-native-webview` works as a fallback, it has downsides too:

- **Cookie popups**: Users may be prompted with third-party cookie consents immediately upon loading.
- **External navigation**: Interactive overlay links in web players can redirect users out of your native app.
- **Nested scrolling**: Touch gestures can conflict between native views and web view containers.

### Recommended Strategy: Native / oEmbed Handlers

A much better approach is rendering specific embed providers (such as Spotify, YouTube, or Twitter/X) using native UI or oEmbed APIs.

#### Spotify oEmbed Example

Given a standard Spotify block payload:

```json
{
  "blockName": "core/embed",
  "attrs": {
    "url": "https://open.spotify.com/album/5doNaJuxzyiybQV0YswLBv",
    "type": "rich",
    "providerNameSlug": "spotify",
    "responsive": true,
    "className": "wp-embed-aspect-21-9 wp-has-aspect-ratio"
  },
  "innerBlocks": [],
  "innerHTML": "\n<figure class=\"wp-block-embed is-type-rich is-provider-spotify wp-block-embed-spotify wp-embed-aspect-21-9 wp-has-aspect-ratio\"><div class=\"wp-block-embed__wrapper\">\nhttps://open.spotify.com/album/5doNaJuxzyiybQV0YswLBv\n</div></figure>\n"
}
```

You can fetch embed dimensions and HTML via the [Spotify oEmbed API](https://developer.spotify.com/documentation/embeds/reference/oembed) to render an optimal WebView container:

```typescript
import React, { useEffect, useState } from "react";
import WebView from "react-native-webview";

type SpotifyPlayerProps = {
  url: string;
};

const fetchSpotifyEmbed = async (embedUrl: string) => {
  const absolutePath = `https://open.spotify.com/oembed?url=${embedUrl}`;
  const response = await fetch(absolutePath, { method: "GET" });
  return await response.json();
};

export const SpotifyPlayer = ({ url }: SpotifyPlayerProps) => {
  const [embedHtml, setEmbedHtml] = useState<string>('');
  const [embedHeight, setEmbedHeight] = useState<number>(0);

  useEffect(() => {
    fetchSpotifyEmbed(url).then((result) => {
      setEmbedHeight(result.height);
      setEmbedHtml(result.html);
    });
  }, [url]);

  return (
    <WebView
      nestedScrollEnabled={true}
      overScrollMode="content"
      scalesPageToFit={false}
      javaScriptEnabled={true}
      contentMode="mobile"
      source={{ html: embedHtml }}
      style={{
        flex: 1,
        width: "100%",
        height: embedHeight ? embedHeight + 16 : 352 + 16, // 352px standard + padding
        backgroundColor: "transparent",
      }}
    />
  );
};
```

---

## Supported Core Blocks

Reference: [WordPress Gutenberg Core Blocks Guide](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/)

### Design

| Block Name                      |        Supported        | Notes                                      | Docs                                                                                                                                      |
| :------------------------------ | :---------------------: | :----------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `core/accordion`                |   :white_check_mark:    | Handled through NestedHtmlBlock            | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-accordion/)                |
| `core/accordion-heading`        |   :white_check_mark:    | Accordion header toggle                    | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-accordion-heading/)        |
| `core/accordion-item`           |   :white_check_mark:    | Interactive item container                 | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-accordion-item/)           |
| `core/accordion-panel`          |   :white_check_mark:    | Handled through NestedHtmlBlock            | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-accordion-panel/)          |
| `core/button`                   |   :white_check_mark:    | Button component                           | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-button/)                   |
| `core/buttons`                  |   :white_check_mark:    | Button group wrapper                       | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-buttons/)                  |
| `core/column`                   |   :white_check_mark:    | Column layout item                         | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-column/)                   |
| `core/columns`                  |   :white_check_mark:    | Multi-column row layout                    | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-columns/)                  |
| `core/comment-template`         |           :x:           | User content (outside post scope + unsafe) | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-comment-template/)         |
| `core/group`                    |   :white_check_mark:    | Flex / Grid / Group layout container       | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-group/)                    |
| `core/home-link`                |           :x:           | Site navigation element                    | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-home-link/)                |
| `core/more`                     | :part_alternation_mark: | Mapped to empty placeholder                | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-more/)                     |
| `core/navigation-link`          |           :x:           | Site navigation element                    | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-navigation-link/)          |
| `core/navigation-overlay-close` |           :x:           | Site navigation element                    | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-navigation-overlay-close/) |
| `core/navigation-submenu`       |           :x:           | Site navigation element                    | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-navigation-submenu/)       |
| `core/nextpage`                 |           :x:           | Post pagination                            | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-nextpage/)                 |
| `core/separator`                |   :white_check_mark:    | Divider line                               | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-separator/)                |
| `core/spacer`                   |   :white_check_mark:    | Vertical spacing element                   | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-spacer/)                   |
| `core/tab-list`                 |           :x:           | Site element                               | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-tab-list/)                 |
| `core/tab-panel`                |           :x:           | Site element                               | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-tab-panel/)                |
| `core/tab-panels`               |           :x:           | Site element                               | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-tab-panels/)               |
| `core/table-of-contents`        |           :x:           | Site element                               | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-table-of-contents/)        |
| `core/tabs`                     |           :x:           | Site element                               | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-design/core-block-tabs/)                     |

### Embed

See [Handling Embeds](#handling-embeds) section above.

| Block Name   | Supported | Notes                               | Docs                                                                                                                  |
| :----------- | :-------: | :---------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `core/embed` |    :x:    | Custom handler per type recommended | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-embed/core-block-embed/) |

### Media

| Block Name            |        Supported        | Notes                             | Docs                                                                                                                           |
| :-------------------- | :---------------------: | :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `core/audio`          |           :x:           | Requires audio player package     | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-media/core-block-audio/)          |
| `core/cover`          | :part_alternation_mark: | Cover block with background image | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-media/core-block-cover/)          |
| `core/file`           | :part_alternation_mark: | Standard file link block          | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-media/core-block-file/)           |
| `core/gallery`        |   :white_check_mark:    | Image gallery grid                | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-media/core-block-gallery/)        |
| `core/icon`           |           :x:           | Icon mapping                      | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-media/core-block-icon/)           |
| `core/image`          |   :white_check_mark:    | Standard image with caption       | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-media/core-block-image/)          |
| `core/media-text`     |   :white_check_mark:    | Media & text layout               | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-media/core-block-media-text/)     |
| `core/playlist`       |           :x:           | Audio playlist                    | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-media/core-block-playlist/)       |
| `core/playlist-track` |           :x:           | Audio playlist track              | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-media/core-block-playlist-track/) |
| `core/video`          |           :x:           | Requires video player package     | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-media/core-block-video/)          |

### Reusable

| Block Name   | Supported | Notes                            | Docs                                                                                                                     |
| :----------- | :-------: | :------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `core/block` |    :x:    | Invesitage embedding in endpoint | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-reusable/core-block-block/) |

### Text

| Block Name          |        Supported        | Notes                                        | Docs                                                                                                                        |
| :------------------ | :---------------------: | :------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `core/code`         |   :white_check_mark:    | Code snippet block                           | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-text/core-block-code/)         |
| `core/details`      | :part_alternation_mark: | Collapsible details block                    | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-text/core-block-details/)      |
| `core/footnotes`    | :part_alternation_mark: | Footnotes block                              | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-text/core-block-footnotes/)    |
| `core/freeform`     | :part_alternation_mark: | Classic editor HTML content                  | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-text/core-block-freeform/)     |
| `core/heading`      |   :white_check_mark:    | Headings (H1 - H6)                           | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-text/core-block-heading/)      |
| `core/list`         |   :white_check_mark:    | Ordered & Unordered lists                    | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-text/core-block-list/)         |
| `core/list-item`    |   :white_check_mark:    | List items with nesting                      | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-text/core-block-list-item/)    |
| `core/math`         |           :x:           | Requires LaTeX parser                        | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-text/core-block-math/)         |
| `core/missing`      |           :x:           | Missing block placeholder                    | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-text/core-block-missing/)      |
| `core/paragraph`    |   :white_check_mark:    | Paragraph text block                         | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-text/core-block-paragraph/)    |
| `core/preformatted` |   :white_check_mark:    | Preformatted text                            | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-text/core-block-preformatted/) |
| `core/pullquote`    |   :white_check_mark:    | Pullquote block                              | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-text/core-block-pullquote/)    |
| `core/quote`        |   :white_check_mark:    | Blockquote with citation                     | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-text/core-block-quote/)        |
| `core/table`        |   :white_check_mark:    | HTML Table block (`table`, `tr`, `td`, `th`) | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-text/core-block-table/)        |
| `core/verse`        |   :white_check_mark:    | Poetry / verse block                         | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-text/core-block-verse/)        |

### Widgets & Custom

| Block Name  |        Supported        | Notes                        | Docs                                                                                                                   |
| :---------- | :---------------------: | :--------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `core/html` | :part_alternation_mark: | Custom HTML parser rendering | [docs](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/core-blocks-widgets/core-block-html/) |

---

## License

[MIT](LICENSE)
