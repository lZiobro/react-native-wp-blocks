import { describe, expect, it } from '@jest/globals';
import { fullExampleResponse } from '../__fixtures__/fullExample';
import { designOverviewResponse } from '../__fixtures__/designOverview';
import { embedsOverviewResponse } from '../__fixtures__/embedsOverview';
import { textInDepthListsResponse } from '../__fixtures__/indepthLists';
import { mediaOverviewResponse } from '../__fixtures__/mediaOverview';
import { textOverviewResponse } from '../__fixtures__/textOverview';
import { themeOverviewResponse } from '../__fixtures__/themeOverview';
import { widgetsOverviewResponse } from '../__fixtures__/widgetsOverview';
import { render } from '@testing-library/react-native';
import { WordPressProvider } from '../../WordPressProvider';
import { WordPressBlockSelector } from '../../_blocks';

describe('WordPress Example Fixture Snapshots', () => {
  const examples = [
    { name: 'Design Blocks', blocks: designOverviewResponse.blocks },
    { name: 'Embeds Blocks', blocks: embedsOverviewResponse.blocks },
    { name: 'Full Article Example', blocks: fullExampleResponse.blocks },
    {
      name: 'Text in-depth Lists Blocks',
      blocks: textInDepthListsResponse.blocks,
    },
    { name: 'Media Blocks', blocks: mediaOverviewResponse.blocks },
    { name: 'Text Blocks', blocks: textOverviewResponse.blocks },
    { name: 'Theme Blocks', blocks: themeOverviewResponse.blocks },
    { name: 'Widget Blocks', blocks: widgetsOverviewResponse.blocks },
  ];
  examples.forEach(({ name, blocks }) => {
    it(`matches snapshot for ${name}`, async () => {
      const { toJSON } = await render(
        <WordPressProvider>
          {blocks.map((block, index) => (
            <WordPressBlockSelector key={index} wpBlock={block} />
          ))}
        </WordPressProvider>
      );

      expect(toJSON()).toMatchSnapshot();
    });
  });
});
