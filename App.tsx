import {HotUpdater} from '@hot-updater/react-native';
import {Text, View} from 'react-native';

function App() {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
      <Text
        style={{
          color: 'white',
        }}>
        Hello Akib shaikh Limbuuuu se
      </Text>
      <View
        style={{
          borderWidth: 1,
          width: 100,
          height: 100,
          backgroundColor: '#cdcdcd',
        }}></View>
      <View
        style={{
          borderWidth: 1,
          width: 100,
          height: 100,
          backgroundColor: '#cdcdcd',
        }}></View>
      <View
        style={{
          borderWidth: 1,
          width: 100,
          height: 100,
          backgroundColor: '#cdcdcd',
        }}></View>
    </View>
  );
}

export default HotUpdater.wrap({
  source: 'https://bcwscdusglhrjlhgchrz.supabase.co/functions/v1/update-server',
  requestHeaders: {
    // if you want to use the request headers, you can add them here
  },

  reloadOnForceUpdate: true,
  fallbackComponent: ({progress, status}) => (
    <View
      style={{
        flex: 1,
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* You can put a splash image here. */}

      {/* {progress > 0 ? (
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          {Math.round(progress * 100)}%
        </Text>
      ) : null} */}
    </View>
  ),
})(App);
