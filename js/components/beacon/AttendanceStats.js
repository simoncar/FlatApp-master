import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements';
import { FontAwesome } from "@expo/vector-icons";

import useBeaconSearchHook from "./utils/BeaconSearchStore";

const AttendanceStats = ({ navigation }) => {
  const [globalBeaconSearchState, globalBeaconSearchAction] = useBeaconSearchHook();

  routeBtn = (state) => {
    globalBeaconSearchAction.setBeaconState(state);
    navigation.navigate("GradeListingScreen");
  }

  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
        <Button
          title="Today 28 June 2019"
          raised
          icon={
            <View style={{ paddingRight: 10 }}>
              <FontAwesome
                name="calendar"
                size={15}
                color='#48484A'
              />
            </View>
          }
          buttonStyle={{ backgroundColor: '#d3d3d3', padding: 2 }}
          titleStyle={{ color: '#48484A', fontSize: 14 }}
        />
      </View>
      <View style={styles.stats}>
        <View style={styles.statsCol}>
          <TouchableOpacity style={[styles.widget, { backgroundColor: '#0074D9' }]} onPress={() => routeBtn("Entered")}>
            <View>
              <Text style={styles.widgetTextTitle}>Entered</Text>
              <Text style={styles.widgetTextContent}>3055</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.widget, { backgroundColor: 'olivedrab' }]} onPress={() => routeBtn("Exited")}>
            <View>
              <Text style={styles.widgetTextTitle}>Exited</Text>
              <Text style={styles.widgetTextContent}>27</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.statsCol}>

          <TouchableOpacity style={[styles.widget, { backgroundColor: 'darkorchid' }]} onPress={() => routeBtn("Entered")}>
            <View>
              <Text style={styles.widgetTextTitle}>Total</Text>
              <Text style={styles.widgetTextContent}>3210</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.widget, { backgroundColor: '#FF4136' }]} onPress={() => routeBtn("Perimeter")}>
            <View>
              <Text style={styles.widgetTextTitle}>Perimeter</Text>
              <Text style={styles.widgetTextContent}>270</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.widget, { backgroundColor: 'tomato' }]} onPress={() => routeBtn("Not Present")}>
            <View>
              <Text style={styles.widgetTextTitle}>Not Present</Text>
              <Text style={styles.widgetTextContent}>155</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: '#d3d3d3'
  },
  stats: {
    flex: 1,
    flexDirection: 'row'
  },
  statsCol: {
    flex: 1,
    flexDirection: 'column',
  },
  widget: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    margin: 3,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 8
  },
  widgetTextTitle: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#DDDDDD'
  },
  widgetTextContent: {
    fontSize: 44,
    textAlign: 'center',
    color: '#333'
  }
});


export default AttendanceStats;