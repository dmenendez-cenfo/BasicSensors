import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Sensors from 'react-native-sensors';

const Value = ({name, value}) => (
  <View style={styles.valueContainer}>
    <Text style={styles.valueName}>{name}:</Text>
    <Text style={styles.valueValue}>{value.substr(0, 8)}</Text>
  </View>
);

export default function (sensorName, values) {
  const sensor$ = Sensors[sensorName];

  return () => {
    const [sensorValues, setSensorValues] = useState(
      values.reduce((carry, val) => ({...carry, [val]: 0}), {}),
    );

    useEffect(() => {
      let subscription = (subscription = sensor$.subscribe(currentValues => {
        setSensorValues({...currentValues});
      }));

      return () => {
        subscription.unsubscribe();
        subscription = null;
      };
    }, []);

    return (
      <View style={styles.container}>
        <Text style={styles.headline}>{sensorName} values</Text>
        {values.map(valueName => (
          <Value
            key={sensorName + valueName}
            name={valueName}
            value={sensorValues[valueName]}
          />
        ))}
      </View>
    );
  };

  // NOTA: EQUIVALENTE AL FUNCTION COMPONENT DE ARRIBA

  // return class SensorView extends Component {
  //   constructor(props) {
  //     super(props);

  //     const initialValue = values.reduce(
  //       (carry, val) => ({...carry, [val]: 0}),
  //       {},
  //     );
  //     this.state = initialValue;
  //   }

  //   componentWillMount() {
  //     const subscription = sensor$.subscribe(values => {
  //       this.setState({...values});
  //     });
  //     this.setState({subscription});
  //   }

  //   componentWillUnmount() {
  //     this.state.subscription.unsubscribe();
  //     this.setState({subscription: null});
  //   }

  //   render() {
  //     return (
  //       <View style={styles.container}>
  //         <Text style={styles.headline}>{sensorName} values</Text>
  //         {values.map(valueName => (
  //           <Value
  //             key={sensorName + valueName}
  //             name={valueName}
  //             value={this.state[valueName]}
  //           />
  //         ))}
  //       </View>
  //     );
  //   }
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 50,
  },
  headline: {
    fontSize: 30,
    textAlign: 'left',
    margin: 10,
  },
  valueContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  valueValue: {
    width: 200,
    fontSize: 20,
  },
  valueName: {
    width: 50,
    fontSize: 20,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
