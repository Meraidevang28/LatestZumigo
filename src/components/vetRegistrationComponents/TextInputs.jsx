import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';

const TextInputs = ({
  placeholder,
  keyboardType,
  numberOfLines,
  multiline,
  onChangeText,
  value,
  placeholderTextColor = '00000080',
}) => {
  const [inputHeight, setInputHeight] = useState(58);
  return (
    <View>
      <TextInput
        style={[
          styles.inputBoxes,
          numberOfLines
            ? {height: numberOfLines * 20, textAlignVertical: 'top'}
            : {},
        ]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        numberOfLines={numberOfLines}
        multiline={multiline}
        onChangeText={onChangeText}
        value={value}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBoxes: {
    height: 58,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    backgroundColor: '#f3f6f7',
    borderRadius: 15,
    paddingHorizontal: 10,
    borderWidth: 0.6,
    borderColor: '#e8e9eb',
    paddingVertical: 10,
    marginBottom: 15,
  },
});
export default TextInputs;
