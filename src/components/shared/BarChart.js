import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';

const BarChart = () => {
  const data = [
    {label: 'Sept', value: 40},
    {label: 'Oct', value: 70},
    {label: 'Nov', value: 60},
    {label: 'Dec', value: 100},
    {label: 'Jan', value: 95},
    {label: 'Feb', value: 55},
    {label: 'Mar', value: 90},
    {label: 'Apr', value: 85, active: true},
  ];
  const maxVal = Math.max(...data.map(d => d.value));
  const chartHeight = 100;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className="bg-[#ffe6f0] rounded-2xl p-4 w-[95%] self-center mt-6"
      style={{
        borderColor: '#f8c4d5',
        borderWidth: 1,
      }}>
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-[23px] font-Nunito-Bold text-[#d44577]">
            ₹ 9,721.00
          </Text>
          <Text
            className="text-[16px] text-[#333] font-Nunito-Regular"
            style={{fontFamily: '500'}}>
            Earned this month
          </Text>
        </View>
        <Text className="text-[#d44577] text-[20px]">{'>'}</Text>
      </View>

      <View className="mt-4 flex-row justify-between items-end h-[120px]">
        {data.map((item, index) => (
          <View key={index} className="items-center" style={{width: 30}}>
            <View
              style={{
                height: (item.value / maxVal) * chartHeight,
                backgroundColor: item.active ? '#d44577' : '#e5dce5',
                width: 20,
                borderRadius: 6,
              }}
            />
            <Text
              className="mt-2 text-xs"
              style={{color: item.active ? '#d44577' : '#8c8c8c'}}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default BarChart;

// const styles = StyleSheet.create({});
