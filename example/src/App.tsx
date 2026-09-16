import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PostScreen } from './app/post';
import { ListingScreen } from './app/listing';

const RootStack = createNativeStackNavigator({
  screens: {
    Listing: {
      screen: ListingScreen,
      options: { headerShown: false },
    },
    Post: {
      screen: PostScreen,
      options: {},
      // options: { headerShown: false },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
