import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { textOverviewResponse } from '../../_examples/Text/textOverview';
import { textInDepthListsResponse } from '../../_examples/Text/indepthLists';
import { mediaOverviewResponse } from '../../_examples/Media/mediaOverview';
import { designOverviewResponse } from '../../_examples/Design/designOverview';
import { widgetsOverviewResponse } from '../../_examples/Widgets/widgetsOverview';
import { themeOverviewResponse } from '../../_examples/Theme/themeOverview';
import { embedsOverviewResponse } from '../../_examples/Embeds/embedsOverview';
import { fullExampleResponse } from '../../_examples/Full/fullExample';

const testReponses = [
  fullExampleResponse,
  textOverviewResponse,
  textInDepthListsResponse,
  mediaOverviewResponse,
  designOverviewResponse,
  widgetsOverviewResponse,
  themeOverviewResponse,
  embedsOverviewResponse,
];

const ListItem = ({ onPress, item }: { onPress: () => void; item: any }) => {
  return (
    <Pressable onPress={onPress} style={styles.listItem}>
      <Text style={styles.listItemTitle}>{item.title}</Text>
    </Pressable>
  );
};

export const ListingScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <FlatList
        data={testReponses}
        renderItem={(x) => (
          <ListItem
            key={x.index}
            onPress={() =>
              //@ts-ignore
              navigation.navigate('Post', { id: x.item.id.toString() })
            }
            item={x.item}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#AAA',
    padding: 20,
    flex: 1,
    marginTop: 30,
  },
  listItemTitle: { fontWeight: 700 },
});
