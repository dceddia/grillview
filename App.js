import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class App extends React.Component {
  state = {
    cameraPermission: null
  };

  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA).then(({ status }) =>
      this.setState({
        cameraPermission: status === 'granted'
      })
    );
  }

  render() {
    const { cameraPermission } = this.state;

    return (
      <View style={styles.container}>
        {cameraPermission === null ? (
          <Text>Waiting for permission...</Text>
        ) : cameraPermission === false ? (
          <Text>Permission denied</Text>
        ) : (
          <Autoshoot/>
        )}
      </View>
    );
  }
}

class Autoshoot extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, width: '100%' }}>
        <Camera
          style={{ flex: 1 }}
          type={Camera.Constants.Type.back}
          ref={cam => this.camera = cam}>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
