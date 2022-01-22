import React from 'react';
import {ScrollView} from 'react-native';
import SensorsView from './SensorsView';

const axis = ['x', 'y', 'z'];

const sensors = {
  accelerometer: axis,
  gyroscope: axis,
  magnetometer: axis,
  barometer: ['pressure'],
};

const viewComponents = Object.entries(sensors).map(([name, values]) =>
  SensorsView(name, values),
);

const App = () => {
  return (
    <ScrollView>
      {viewComponents.map((Comp, index) => (
        <Comp key={`sensor-view-${index}`} />
      ))}
    </ScrollView>
  );
};

export default App;
