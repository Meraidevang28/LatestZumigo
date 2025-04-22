import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

const AppointmentComponent = () => {
  const screenWidth = Dimensions.get('window').width;
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Mar'],
    datasets: [
      {
        data: [124, 530, 620, 260, 670, 80, 100, 500], // My Appointments
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Dark Red
      },
      {
        data: [1324, 1156, 1427, 840, 1290, 290, 560, 100], // Total Appointments
        color: (opacity = 0.5) => `rgba(255, 99, 132, ${opacity})`, // Lighter Red
      },
    ],
  };
  return (
    <>
      <View style={styles.container}>
        {/* Bar Chart */}
        <BarChart
          data={{
            labels: data.labels,
            datasets: [
              {
                data: data.datasets[0].data,
                color: data.datasets[0].color,
              },
              {
                data: data.datasets[1].data,
                color: data.datasets[1].color,
              },
            ],
          }}
          width={screenWidth - 80} // Chart width
          height={220} // Chart height
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            barPercentage: 0.5,
            color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 8,
            },
          }}
          style={styles.chart}
          fromZero={true}
          showBarTops={true}
        />

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            {/* <View
              style={[
                styles.legendColor,
                {backgroundColor: 'rgba(255, 99, 132, 1)'},
              ]}
            /> */}
            {/* <Text>My Appointments</Text> */}
          </View>
          <View style={styles.legendItem}>
            {/* <View
              style={[
                styles.legendColor,
                {backgroundColor: 'rgba(255, 99, 132, 0.5)'},
              ]}
            /> */}
            {/* <Text>Total Appointments</Text> */}
          </View>
        </View>
      </View>
    </>
  );
};

export default AppointmentComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 0.75,
    borderColor: '#FFF4E5',
    borderRadius: 15,
    // marginLeft: 10,
    // marginRight: 50,
    marginBottom: 10,
    // backgroundColor: "#FFFCF8",
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  chart: {
    marginRight: 20,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
});
