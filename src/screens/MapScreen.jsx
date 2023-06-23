import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ route }) {
  const latitude = route.params?.latitude ?? 49.83968;
  const longitude = route.params?.longitude ?? 24.02972;

  return (
    <View style={styles.main}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {route.params && (
          <Marker
            title={route.params?.name ?? 'Моє місце'}
            coordinate={{ latitude: latitude, longitude: longitude }}
            description={route.params}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },

  mapStyle: {
    width: '100%',
    height: '100%',
  },
});
