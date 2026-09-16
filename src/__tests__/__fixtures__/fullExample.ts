/* eslint-disable no-useless-escape */
export const fullExampleResponse = {
  id: 27,
  title: 'Complete Article Example',
  shortDescription:
    'Translating Gutenberg blocks into React Native components is pretty complicated. It requires handling a lot of different cases, parsing attributes and is overall just a bad experience. But it doesn&#8217;t have to be!',
  previewImage:
    'http:\/\/localhost:8080\/wp-content\/uploads\/2026\/09\/building-400x400-1.png',
  date: '2026-09-15 12:00:59',
  author: {
    nickname: null,
    name: ' ',
    description: null,
    avatarUrl:
      'https:\/\/secure.gravatar.com\/avatar\/8368b6b19c1f0ef13e2e416945f18182054a70e82f74bc1a2ea160021c70f8aa?s=96&d=mm&r=g',
  },
  blocks: [
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        "\n<p>Translating Gutenberg blocks into React Native components is pretty complicated. It requires handling a lot of different cases, parsing attributes and is overall just a bad experience. But it doesn't have to be!<\/p>\n",
      innerContent: [
        "\n<p>Translating Gutenberg blocks into React Native components is pretty complicated. It requires handling a lot of different cases, parsing attributes and is overall just a bad experience. But it doesn't have to be!<\/p>\n",
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/more',
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n<!--more-->\n',
      innerContent: ['\n<!--more-->\n'],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/heading',
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n<h2 class="wp-block-heading">Humble beginnings<\/h2>\n',
      innerContent: [
        '\n<h2 class="wp-block-heading">Humble beginnings<\/h2>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        '\n<p>Starting out seems easy. Gutenberg blocks are pretty well documented, they have a solid structure and all the necessary data embedded into them, right?<\/p>\n',
      innerContent: [
        '\n<p>Starting out seems easy. Gutenberg blocks are pretty well documented, they have a solid structure and all the necessary data embedded into them, right?<\/p>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/image',
      attrs: { sizeSlug: 'large' },
      innerBlocks: [],
      innerHTML:
        '\n<figure class="wp-block-image size-large"><img src="https:\/\/placehold.net\/400x400.png" alt=""\/><figcaption class="wp-element-caption">Not everything is as simple as it seems.<\/figcaption><\/figure>\n',
      innerContent: [
        '\n<figure class="wp-block-image size-large"><img src="https:\/\/placehold.net\/400x400.png" alt=""\/><figcaption class="wp-element-caption">Not everything is as simple as it seems.<\/figcaption><\/figure>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        "\n<p>Let's take a look at the structure first. Although it does seem well defined, Gutenberg is still being updated, and things constantly change. For example - a List block would have all its contents embedded into innerHTML and no ListItem blocks in early days.<\/p>\n",
      innerContent: [
        "\n<p>Let's take a look at the structure first. Although it does seem well defined, Gutenberg is still being updated, and things constantly change. For example - a List block would have all its contents embedded into innerHTML and no ListItem blocks in early days.<\/p>\n",
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/code',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        '\n<pre class="wp-block-code"><code>"blockName":"core\\\/list",\n"attrs":&#91;],\n"innerBlocks":&#91;],\n"innerHTML":"\\n\n&lt;ul&gt;\n  &lt;li&gt;\n    &lt;a href=\\"https:\\\/\\\/google.com\\\/"\n       target=\\"_blank\\" rel=\\"noreferrer\n       noopener\\"&gt;\n      google.com\n    &lt;\\\/a&gt;\n  &lt;\\\/li&gt;\n  &lt;li&gt;second list element\n  &lt;\\\/li&gt;\n&lt;\\\/ul&gt;\\n",\n"innerContent":&#91;...]<\/code><\/pre>\n',
      innerContent: [
        '\n<pre class="wp-block-code"><code>"blockName":"core\\\/list",\n"attrs":&#91;],\n"innerBlocks":&#91;],\n"innerHTML":"\\n\n&lt;ul&gt;\n  &lt;li&gt;\n    &lt;a href=\\"https:\\\/\\\/google.com\\\/"\n       target=\\"_blank\\" rel=\\"noreferrer\n       noopener\\"&gt;\n      google.com\n    &lt;\\\/a&gt;\n  &lt;\\\/li&gt;\n  &lt;li&gt;second list element\n  &lt;\\\/li&gt;\n&lt;\\\/ul&gt;\\n",\n"innerContent":&#91;...]<\/code><\/pre>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        "\n<p>As showcased in the provided snippet, all of the list contents are squished into innerHTML rather than placing each element in a separate block and then into innerBlocks. Nowadays it follows a proper structure, but it's still necessary to handle old versions for backwards compatibility.<\/p>\n",
      innerContent: [
        "\n<p>As showcased in the provided snippet, all of the list contents are squished into innerHTML rather than placing each element in a separate block and then into innerBlocks. Nowadays it follows a proper structure, but it's still necessary to handle old versions for backwards compatibility.<\/p>\n",
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n<p><br><\/p>\n',
      innerContent: ['\n<p><br><\/p>\n'],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/heading',
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n<h2 class="wp-block-heading">Stylish choices<\/h2>\n',
      innerContent: ['\n<h2 class="wp-block-heading">Stylish choices<\/h2>\n'],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        "\n<p>Backwards compatibility is somewhat expected. But what about custom WordPress themes? Should we try to parse them? Maybe we can write an additional translator from WordPress theme to some json specification and then parse each element trying to apply the styles? While this seems like a valid choice it's once again way more complicated...<\/p>\n",
      innerContent: [
        "\n<p>Backwards compatibility is somewhat expected. But what about custom WordPress themes? Should we try to parse them? Maybe we can write an additional translator from WordPress theme to some json specification and then parse each element trying to apply the styles? While this seems like a valid choice it's once again way more complicated...<\/p>\n",
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        '\n<p>Custom themes do not only introduce styling. They can change block structure and do all sorts of things. Then there is a mobile app theme vs WordPress theme. Just imagine WordPress using light theme and your app using a dark one! That would be a total disaster!<\/p>\n',
      innerContent: [
        '\n<p>Custom themes do not only introduce styling. They can change block structure and do all sorts of things. Then there is a mobile app theme vs WordPress theme. Just imagine WordPress using light theme and your app using a dark one! That would be a total disaster!<\/p>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        "\n<p>Instead, what we can do is simplify it. Instead of parsing every little tiny thing, we can only take into account what's important! Like layout! Combine this with a lookup table and a list of allowed tags to parse and voila! This way you can use React Native components with a WordPress like layout and have the best of both worlds!<\/p>\n",
      innerContent: [
        "\n<p>Instead, what we can do is simplify it. Instead of parsing every little tiny thing, we can only take into account what's important! Like layout! Combine this with a lookup table and a list of allowed tags to parse and voila! This way you can use React Native components with a WordPress like layout and have the best of both worlds!<\/p>\n",
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n<p><br><\/p>\n',
      innerContent: ['\n<p><br><\/p>\n'],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/heading',
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n<h2 class="wp-block-heading">Dynamic troubles<\/h2>\n',
      innerContent: ['\n<h2 class="wp-block-heading">Dynamic troubles<\/h2>\n'],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        "\n<p>We've tackled blocks and styles, but there is still one more layer to all of this. The way information is stored in blocks is quite convoluted. We have 2 main types of blocks - Static and Dynamic.<\/p>\n",
      innerContent: [
        "\n<p>We've tackled blocks and styles, but there is still one more layer to all of this. The way information is stored in blocks is quite convoluted. We have 2 main types of blocks - Static and Dynamic.<\/p>\n",
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        '\n<p>Static blocks are saved as a fixed HTML snippet. There is no additional processing required when serving them to the user. For the structure, they contain all the necessary information to parse them in the app in innerHTML and attrs.<\/p>\n',
      innerContent: [
        '\n<p>Static blocks are saved as a fixed HTML snippet. There is no additional processing required when serving them to the user. For the structure, they contain all the necessary information to parse them in the app in innerHTML and attrs.<\/p>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        '\n<p>Dynamic blocks however are a different breed. They store almost no data in the form of fixed HTML. Instead they are rendered server-side for each request.<\/p>\n',
      innerContent: [
        '\n<p>Dynamic blocks however are a different breed. They store almost no data in the form of fixed HTML. Instead they are rendered server-side for each request.<\/p>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        "\n<p>WordPress <code>parse_blocks<\/code> function doesn't actually embed dynamic blocks contents. To get a complete HTML snippet you would have to also call <code>render_block<\/code>. While <code>do_blocks<\/code> combines both of them I stand against using it.<\/p>\n",
      innerContent: [
        "\n<p>WordPress <code>parse_blocks<\/code> function doesn't actually embed dynamic blocks contents. To get a complete HTML snippet you would have to also call <code>render_block<\/code>. While <code>do_blocks<\/code> combines both of them I stand against using it.<\/p>\n",
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        '\n<p>The rendered HTML snippet is often in such a form that it\'s unusable anyway. A much better solution is embedding necessary data into attrs. You can check out the example here: <a href="https:\/\/github.com\/lZiobro\/wp-blocks-rest-api">wp-blocks-rest-api<\/a>.<\/p>\n',
      innerContent: [
        '\n<p>The rendered HTML snippet is often in such a form that it\'s unusable anyway. A much better solution is embedding necessary data into attrs. You can check out the example here: <a href="https:\/\/github.com\/lZiobro\/wp-blocks-rest-api">wp-blocks-rest-api<\/a>.<\/p>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n<p><br><\/p>\n',
      innerContent: ['\n<p><br><\/p>\n'],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/heading',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        '\n<h2 class="wp-block-heading">Let\'s double the trouble<\/h2>\n',
      innerContent: [
        '\n<h2 class="wp-block-heading">Let\'s double the trouble<\/h2>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        "\n<p>Now that we've handled static and dynamic blocks, all that's left is to parse them into React Native components, right? As it turns out, parsing HTML structure into React Native components is once again pretty complicated.<\/p>\n",
      innerContent: [
        "\n<p>Now that we've handled static and dynamic blocks, all that's left is to parse them into React Native components, right? As it turns out, parsing HTML structure into React Native components is once again pretty complicated.<\/p>\n",
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        '\n<p>The core issue here is that nesting a <code>View<\/code> inside a <code>Text<\/code> component is very finicky, unstable, and unreliable. Not to mention it would just crash on Android until recently<sup data-fn="a760ad20-5384-4504-b8d9-e0df63df5687" class="fn"><a href="#a760ad20-5384-4504-b8d9-e0df63df5687" id="a760ad20-5384-4504-b8d9-e0df63df5687-link">1<\/a><\/sup>.<\/p>\n',
      innerContent: [
        '\n<p>The core issue here is that nesting a <code>View<\/code> inside a <code>Text<\/code> component is very finicky, unstable, and unreliable. Not to mention it would just crash on Android until recently<sup data-fn="a760ad20-5384-4504-b8d9-e0df63df5687" class="fn"><a href="#a760ad20-5384-4504-b8d9-e0df63df5687" id="a760ad20-5384-4504-b8d9-e0df63df5687-link">1<\/a><\/sup>.<\/p>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        "\n<p>Let's take a look at the HTML structure below and see how a naive translator would try to map it to React Native components:<\/p>\n",
      innerContent: [
        "\n<p>Let's take a look at the HTML structure below and see how a naive translator would try to map it to React Native components:<\/p>\n",
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/code',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        '\n<pre class="wp-block-code"><code>&lt;ul&gt;\n  &lt;li&gt;\n    a link to: \n    &lt;a href="https:\/\/google.com\/"&gt;\n      google.com\n      &lt;img src="placeholder.com\/example.png" alt="" \/&gt;\n    &lt;\/a&gt;\n  &lt;\/li&gt;\n&lt;\/ul&gt;<\/code><\/pre>\n',
      innerContent: [
        '\n<pre class="wp-block-code"><code>&lt;ul&gt;\n  &lt;li&gt;\n    a link to: \n    &lt;a href="https:\/\/google.com\/"&gt;\n      google.com\n      &lt;img src="placeholder.com\/example.png" alt="" \/&gt;\n    &lt;\/a&gt;\n  &lt;\/li&gt;\n&lt;\/ul&gt;<\/code><\/pre>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n<p>At first glance, mapping seems straightforward:<\/p>\n',
      innerContent: [
        '\n<p>At first glance, mapping seems straightforward:<\/p>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/list',
      attrs: [],
      innerBlocks: [
        {
          blockName: 'core\/list-item',
          attrs: [],
          innerBlocks: [],
          innerHTML:
            '\n<li><code>&lt;ul&gt;<\/code> and <code>&lt;li&gt;<\/code> map directly to <strong><code>View<\/code><\/strong>.<\/li>\n',
          innerContent: [
            '\n<li><code>&lt;ul&gt;<\/code> and <code>&lt;li&gt;<\/code> map directly to <strong><code>View<\/code><\/strong>.<\/li>\n',
          ],
        },
        {
          blockName: 'core\/list-item',
          attrs: [],
          innerBlocks: [],
          innerHTML:
            '\n<li>Unwrapped text like <em>"a link to:"<\/em> gets caught and wrapped in a <strong><code>Text<\/code><\/strong> component.<\/li>\n',
          innerContent: [
            '\n<li>Unwrapped text like <em>"a link to:"<\/em> gets caught and wrapped in a <strong><code>Text<\/code><\/strong> component.<\/li>\n',
          ],
        },
        {
          blockName: 'core\/list-item',
          attrs: [],
          innerBlocks: [],
          innerHTML:
            '\n<li>The link text <em>"google.com"<\/em> becomes a <strong><code>Text<\/code><\/strong> with an <code>onPress<\/code> handler.<\/li>\n',
          innerContent: [
            '\n<li>The link text <em>"google.com"<\/em> becomes a <strong><code>Text<\/code><\/strong> with an <code>onPress<\/code> handler.<\/li>\n',
          ],
        },
      ],
      innerHTML: '\n<ul class="wp-block-list">\n\n\n\n<\/ul>\n',
      innerContent: [
        '\n<ul class="wp-block-list">',
        null,
        '\n\n',
        null,
        '\n\n',
        null,
        '<\/ul>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        '\n<p>However, notice what happens to the <code>&lt;img&gt;<\/code> tag inside the link. A naive recursive parser would produce a component tree like this:<\/p>\n',
      innerContent: [
        '\n<p>However, notice what happens to the <code>&lt;img&gt;<\/code> tag inside the link. A naive recursive parser would produce a component tree like this:<\/p>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/code',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        '\n<pre class="wp-block-code"><code>&lt;View>\n  &lt;View>\n    &lt;Text> a link to: &lt;\/Text>\n    &lt;Text onPress={...}>\n      google.com\n      \/\/ Because &lt;img> is nested\n      \/\/ within the same anchor,\n      \/\/ it inherits the same parent - Text\n      &lt;Image src="..." \/>\n    &lt;\/Text>\n  &lt;\/View>\n&lt;\/View><\/code><\/pre>\n',
      innerContent: [
        '\n<pre class="wp-block-code"><code>&lt;View>\n  &lt;View>\n    &lt;Text> a link to: &lt;\/Text>\n    &lt;Text onPress={...}>\n      google.com\n      \/\/ Because &lt;img> is nested\n      \/\/ within the same anchor,\n      \/\/ it inherits the same parent - Text\n      &lt;Image src="..." \/>\n    &lt;\/Text>\n  &lt;\/View>\n&lt;\/View><\/code><\/pre>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        '\n<p>This naive structure leaves us with two major problems:<\/p>\n',
      innerContent: [
        '\n<p>This naive structure leaves us with two major problems:<\/p>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/list',
      attrs: { ordered: true },
      innerBlocks: [
        {
          blockName: 'core\/list-item',
          attrs: [],
          innerBlocks: [],
          innerHTML:
            '\n<li><strong>Improper nesting:<\/strong> Rendering an <code>Image<\/code> inside a <code>Text<\/code> component is incorrect and unstable in React Native.<\/li>\n',
          innerContent: [
            '\n<li><strong>Improper nesting:<\/strong> Rendering an <code>Image<\/code> inside a <code>Text<\/code> component is incorrect and unstable in React Native.<\/li>\n',
          ],
        },
        {
          blockName: 'core\/list-item',
          attrs: [],
          innerBlocks: [],
          innerHTML:
            '\n<li><strong>Baseline collapse:<\/strong> If you try to fix this by replacing the parent <code>Text<\/code> with a <code>Pressable<\/code>, it breaks the inline text baseline alignment with preceding text nodes.<\/li>\n',
          innerContent: [
            '\n<li><strong>Baseline collapse:<\/strong> If you try to fix this by replacing the parent <code>Text<\/code> with a <code>Pressable<\/code>, it breaks the inline text baseline alignment with preceding text nodes.<\/li>\n',
          ],
        },
      ],
      innerHTML: '\n<ol class="wp-block-list">\n\n<\/ol>\n',
      innerContent: [
        '\n<ol class="wp-block-list">',
        null,
        '\n\n',
        null,
        '<\/ol>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n<p><br><\/p>\n',
      innerContent: ['\n<p><br><\/p>\n'],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/heading',
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n<h2 class="wp-block-heading">The remedy<\/h2>\n',
      innerContent: ['\n<h2 class="wp-block-heading">The remedy<\/h2>\n'],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        '\n<p>The only thing that comes to mind in situations like these is tokenization. What if we could artificially close the existing <strong><code>Text<\/code><\/strong> tags before opening an <strong><code>Image<\/code><\/strong>? Then even if we got the same input structure as above, we would end up with a different output structure. We would go through the HTML while keeping "opening" tags on the stack and flushing the content if we encounter <strong><code>Image<\/code><\/strong> or any other tag we want to "fish out" from <strong><code>Text<\/code><\/strong>.<\/p>\n',
      innerContent: [
        '\n<p>The only thing that comes to mind in situations like these is tokenization. What if we could artificially close the existing <strong><code>Text<\/code><\/strong> tags before opening an <strong><code>Image<\/code><\/strong>? Then even if we got the same input structure as above, we would end up with a different output structure. We would go through the HTML while keeping "opening" tags on the stack and flushing the content if we encounter <strong><code>Image<\/code><\/strong> or any other tag we want to "fish out" from <strong><code>Text<\/code><\/strong>.<\/p>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/code',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        '\n<pre class="wp-block-code"><code>&lt;View&gt;\n  &lt;View&gt;\n    &lt;Text&gt; a link to: &lt;\/Text&gt;\n    &lt;Text onPress={...}&gt;\n      google.com\n    \/\/ thanks to tokenization we are closing Text\n    \/\/ before adding an Image\n    &lt;\/Text&gt;\n    \/\/ Image is no longer nested in the Text!\n    &lt;Image src="..." \/&gt;\n  &lt;\/View&gt;\n&lt;\/View&gt;<\/code><\/pre>\n',
      innerContent: [
        '\n<pre class="wp-block-code"><code>&lt;View&gt;\n  &lt;View&gt;\n    &lt;Text&gt; a link to: &lt;\/Text&gt;\n    &lt;Text onPress={...}&gt;\n      google.com\n    \/\/ thanks to tokenization we are closing Text\n    \/\/ before adding an Image\n    &lt;\/Text&gt;\n    \/\/ Image is no longer nested in the Text!\n    &lt;Image src="..." \/&gt;\n  &lt;\/View&gt;\n&lt;\/View&gt;<\/code><\/pre>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        '\n<p>This however brings another problem. If we take <strong><code>Image<\/code><\/strong> out of <strong><code>&lt;a><\/code><\/strong>, how are we supposed to keep the functionality of linking? Just use <code>Context<\/code> and consume it in <code>Image<\/code>. Then simply render an alternate version if we are inside <code>&lt;a><\/code>.<\/p>\n',
      innerContent: [
        '\n<p>This however brings another problem. If we take <strong><code>Image<\/code><\/strong> out of <strong><code>&lt;a><\/code><\/strong>, how are we supposed to keep the functionality of linking? Just use <code>Context<\/code> and consume it in <code>Image<\/code>. Then simply render an alternate version if we are inside <code>&lt;a><\/code>.<\/p>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n<p><br><\/p>\n',
      innerContent: ['\n<p><br><\/p>\n'],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/heading',
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n<h2 class="wp-block-heading">Whole picture?<\/h2>\n',
      innerContent: ['\n<h2 class="wp-block-heading">Whole picture?<\/h2>\n'],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        "\n<p>There are still some intricacies like <code>ListContext<\/code> or <code>Accordion<\/code> implementation, but that's pretty much all the hoops and bumps. We went from basic Gutenberg block structure and backwards compatibility through styling and layout, then back to static and dynamic intricacies and finished up with tokenization to flatten the structure and avoid improper nesting.<\/p>\n",
      innerContent: [
        "\n<p>There are still some intricacies like <code>ListContext<\/code> or <code>Accordion<\/code> implementation, but that's pretty much all the hoops and bumps. We went from basic Gutenberg block structure and backwards compatibility through styling and layout, then back to static and dynamic intricacies and finished up with tokenization to flatten the structure and avoid improper nesting.<\/p>\n",
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        "\n<p>I hope this article helped you understand the whole concept better and even though the process wasn't the most pleasant, the topic was at least a little bit interesting.<\/p>\n",
      innerContent: [
        "\n<p>I hope this article helped you understand the whole concept better and even though the process wasn't the most pleasant, the topic was at least a little bit interesting.<\/p>\n",
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        '\n<p>Remember to check out the package on <a href="https:\/\/github.com">GitHub<\/a> or take a look at the <a href="https:\/\/google.com">documentation<\/a>.<\/p>\n',
      innerContent: [
        '\n<p>Remember to check out the package on <a href="https:\/\/github.com">GitHub<\/a> or take a look at the <a href="https:\/\/google.com">documentation<\/a>.<\/p>\n',
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n<p><br><\/p>\n',
      innerContent: ['\n<p><br><\/p>\n'],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/heading',
      attrs: { level: 3 },
      innerBlocks: [],
      innerHTML: '\n<h3 class="wp-block-heading">What\'s next?<\/h3>\n',
      innerContent: ['\n<h3 class="wp-block-heading">What\'s next?<\/h3>\n'],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/paragraph',
      attrs: [],
      innerBlocks: [],
      innerHTML:
        "\n<p>There's still a lot of work to do. Parsing layout styling is still so-so and base component implementations could be improved. However, what I would like to focus on right now is accessibility and listening to your feedback. Don't shy away from posting issues on GitHub (or starring the repo if you like it!).<\/p>\n",
      innerContent: [
        "\n<p>There's still a lot of work to do. Parsing layout styling is still so-so and base component implementations could be improved. However, what I would like to focus on right now is accessibility and listening to your feedback. Don't shy away from posting issues on GitHub (or starring the repo if you like it!).<\/p>\n",
      ],
    },
    {
      blockName: null,
      attrs: [],
      innerBlocks: [],
      innerHTML: '\n\n',
      innerContent: ['\n\n'],
    },
    {
      blockName: 'core\/footnotes',
      attrs: {
        items: [
          {
            content:
              '<a href="https:\/\/github.com\/react\/react-native\/blob\/main\/CHANGELOG-0.6x.md#android-specific-79">https:\/\/github.com\/react\/react-native\/blob\/main\/CHANGELOG-0.6x.md#android-specific-79<\/a>',
            id: 'a760ad20-5384-4504-b8d9-e0df63df5687',
          },
        ],
      },
      innerBlocks: [],
      innerHTML: '',
      innerContent: [],
    },
  ],
};
