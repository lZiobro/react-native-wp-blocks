import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WordPressProvider } from '../../_widgets/WordPressPostWidget/WordPressProvider';
import { useMemo } from 'react';
import { textOverviewResponse } from '../../_examples/Text/textOverview';
import { textInDepthListsResponse } from '../../_examples/Text/indepthLists';
import { mediaOverviewResponse } from '../../_examples/Media/mediaOverview';
import { designOverviewResponse } from '../../_examples/Design/designOverview';
import { widgetsOverviewResponse } from '../../_examples/Widgets/widgetsOverview';
import { themeOverviewResponse } from '../../_examples/Theme/themeOverview';
import { embedsOverviewResponse } from '../../_examples/Embeds/embedsOverview';
import { fullExampleResponse } from '../../_examples/Full/fullExample';
import { WordPressContent } from 'react-native-wp-blocks';

export const PostScreen = ({ route }: { route: any }) => {
  const blocks = useMemo(() => {
    switch (route.params?.id) {
      case '8':
        return textOverviewResponse.blocks;
      case '12':
        return textInDepthListsResponse.blocks;
      case '15':
        return mediaOverviewResponse.blocks;
      case '19':
        return designOverviewResponse.blocks;
      case '21':
        return widgetsOverviewResponse.blocks;
      case '23':
        return themeOverviewResponse.blocks;
      case '25':
        return embedsOverviewResponse.blocks;
      case '27':
        return fullExampleResponse.blocks;
      default:
        return textOverviewResponse.blocks;
    }
  }, [route]);
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <WordPressProvider>
        <WordPressContent blocks={blocks} />
      </WordPressProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#222',
  },
});
