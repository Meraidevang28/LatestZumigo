import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useMemo, useRef, useCallback, useEffect} from 'react';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AssistantsScreen = () => {
  const editAssistantBottomSheet = useRef(null);
  const snapPoints = useMemo(() => ['60%'], []);
  const [editedName, setEditedName] = useState('');
  const [editedMobile, setEditedMobile] = useState('');
  const [assistants, setAssistants] = useState([]);
  const [selectedAssistantIndex, setSelectedAssistantIndex] = useState(null);
  const [selectedAssistantToDelete, setSelectedAssistantToDelete] =
    useState(null);
  const [newAssistantName, setNewAssistantName] = useState('');
  const [newAssistantMobile, setNewAssistantMobile] = useState('');
  const openEditAssistantBottomSheet = useCallback(
    index => {
      setSelectedAssistantIndex(index);
      setEditedName(assistants[index]?.name || '');
      setEditedMobile(assistants[index]?.mobile || '');
      editAssistantBottomSheet.current?.present();
    },
    [assistants],
  );
  const closeEditAssistantBottomSheet = useCallback(() => {
    editAssistantBottomSheet.current?.dismiss();
  }, []);
  const saveEditedAssistant = async () => {
    if (selectedAssistantIndex !== null) {
      const updatedAssistants = [...assistants];
      updatedAssistants[selectedAssistantIndex] = {
        name: editedName,
        mobile: editedMobile,
      };

      try {
        await AsyncStorage.setItem(
          'assistants',
          JSON.stringify(updatedAssistants),
        );
        setAssistants(updatedAssistants);
      } catch (error) {
        console.error('Error saving edited assistant:', error);
      }

      closeEditAssistantBottomSheet();
    }
  };
  const addMoreAssistantBottomSheet = useRef(null);
  const moreAssistantSnapPoints = useMemo(() => ['60%'], []);
  const openAddMoreAssistantBottomSheet = useCallback(() => {
    addMoreAssistantBottomSheet.current?.present();
  }, []);
  const closeAddMoreAssistantBottomSheet = useCallback(() => {
    addMoreAssistantBottomSheet.current?.dismiss();
  }, []);
  const deleteAssistantBottomSheet = useRef(null);
  const deleteAssistantSnapPoints = useMemo(() => ['60%'], []);
  const openDeleteAssistantBottomSheet = useCallback(index => {
    setSelectedAssistantToDelete(index); // Save the index of the assistant to be deleted
    deleteAssistantBottomSheet.current?.present();
  }, []);
  const closeDeleteAssistantBottomSheet = useCallback(() => {
    deleteAssistantBottomSheet.current?.dismiss();
  });
  const deleteAssistant = async () => {
    if (selectedAssistantToDelete === null) return; // Ensure there is a valid index

    // Remove the assistant from the state using the selected index
    const updatedAssistants = assistants.filter(
      (_, index) => index !== selectedAssistantToDelete,
    );
    setAssistants(updatedAssistants);

    // Update AsyncStorage with the new list
    try {
      await AsyncStorage.setItem(
        'assistants',
        JSON.stringify(updatedAssistants),
      );
    } catch (error) {
      console.error('Error saving updated assistants:', error);
    }

    // Close the bottom sheet after deletion
    closeDeleteAssistantBottomSheet();
  };

  useEffect(() => {
    const loadStoredAssistants = async () => {
      try {
        const storedAssistants = await AsyncStorage.getItem('assistants');
        if (storedAssistants) {
          setAssistants(JSON.parse(storedAssistants));
        }
      } catch (error) {
        console.error('Error loading assistants:', error);
      }
    };
    loadStoredAssistants();
  }, []);

  const addNewAssistant = async () => {
    if (!newAssistantName || !newAssistantMobile) {
      // You can add validation to check if the fields are empty
      console.error('Please fill in all fields');
      return;
    }

    const newAssistant = {
      name: newAssistantName,
      mobile: newAssistantMobile,
    };

    // Fetch the current assistants from AsyncStorage
    const storedAssistants = await AsyncStorage.getItem('assistants');
    const assistants = storedAssistants ? JSON.parse(storedAssistants) : [];

    // Add the new assistant to the existing list
    const updatedAssistants = [...assistants, newAssistant];

    // Save the updated list back to AsyncStorage
    try {
      await AsyncStorage.setItem(
        'assistants',
        JSON.stringify(updatedAssistants),
      );
      setAssistants(updatedAssistants); // Update the local state as well
      closeAddMoreAssistantBottomSheet(); // Close the bottom sheet
    } catch (error) {
      console.error('Error saving new assistant:', error);
    }
    closeAddMoreAssistantBottomSheet();
  };
  console.log(assistants);

  return (
    <>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white px-6">
          {assistants.length > 0 ? (
            assistants.map((assistant, index) => (
              <View
                key={index}
                className="bg-pastelGrey border border-pastelgreyBorder mt-[14.1px] rounded-2xl">
                <View className="flex flex-row items-center mb-[16px] mt-[14.8px] justify-between">
                  <View className="flex flex-col gap-[7.2px] ml-[16px]">
                    <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                      {assistant.name || 'No Name'}
                    </Text>
                    <Text className="text-[14px] font-Nunito-Regular text-[#7f7f7f]">
                      {assistant.mobile || 'No Mobile Number'}
                    </Text>
                  </View>
                  <View className="flex flex-row gap-[5px] mr-[10px]">
                    <TouchableOpacity
                      onPress={() => openEditAssistantBottomSheet(index)}
                      className="border border-red-500 rounded-md px-3 py-1">
                      <Text className="text-red-500 text-[14px] font-Nunito-Regular">
                        Edit
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => openDeleteAssistantBottomSheet(index)}>
                      <View className="border border-red-500 rounded-md px-3 py-1">
                        <Text className="text-red-500 text-[14px] font-Nunito-Regular">
                          Delete
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text className="text-[16px] text-center text-gray-500 mt-5">
              No assistants added
            </Text>
          )}

          <TouchableOpacity onPress={openAddMoreAssistantBottomSheet}>
            <Text className="text-[16px] mt-[15px] text-primary font-Nunito-Bold">
              + Add more assistant
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModalProvider>
      <BottomSheetModal
        ref={editAssistantBottomSheet}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <View className="p-5">
            <Text className="text-lg font-PTSans-Bold text-[#000000]">
              Edit Assistant Details
            </Text>
            <TextInput
              value={editedName}
              onChangeText={setEditedName}
              placeholder="Enter Name"
              placeholderTextColor="#00000080"
              className=" h-[58px] mt-[15px] pl-[10px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl text-[16px] text-[#000000] font-Nunito-Regular"></TextInput>
            <TextInput
              value={editedMobile}
              onChangeText={setEditedMobile}
              placeholder="Enter Mobile Number"
              placeholderTextColor="#00000080"
              keyboardType="phone-pad"
              className=" h-[58px] mt-[15px] pl-[10px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl text-[16px] text-[#000000] font-Nunito-Regular"></TextInput>
            <TouchableOpacity
              className="bg-primary flex items-center mt-[58px] h-[56px] rounded-2xl justify-center"
              onPress={saveEditedAssistant}>
              <Text className="text-[20px] font-Nunito-Bold text-white">
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
      <BottomSheetModal
        ref={addMoreAssistantBottomSheet}
        index={0}
        snapPoints={moreAssistantSnapPoints}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <View className="p-5">
            <Text className="text-lg font-PTSans-Bold text-[#000000]">
              Add assistant Details
            </Text>
            <TextInput
              value={newAssistantName}
              onChangeText={setNewAssistantName}
              placeholder="Enter Name"
              placeholderTextColor="#000000"
              className=" h-[58px] mt-[15px] pl-[10px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl text-[16px] text-[#000000] font-Nunito-Regular"></TextInput>
            <TextInput
              value={newAssistantMobile}
              onChangeText={text => setNewAssistantMobile(text)}
              placeholder="Enter Mobile Number"
              placeholderTextColor="#000000"
              keyboardType="phone-pad"
              className=" h-[58px] mt-[15px] pl-[10px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl text-[16px] text-[#000000] font-Nunito-Regular"></TextInput>
            <TouchableOpacity
              className="bg-primary flex items-center mt-[58px] h-[56px] rounded-2xl justify-center"
              onPress={addNewAssistant}>
              <Text className="text-[20px] font-Nunito-Bold text-white">
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
      <BottomSheetModal
        ref={deleteAssistantBottomSheet}
        index={0}
        snapPoints={deleteAssistantSnapPoints}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <View className="flex justify-center items-center px-6">
            <View className="flex flex-col justify-center items-center">
              <Text className="h-[66px] w-[158px] text-center bg-[#bbbcb8] rounded-[10px]"></Text>
              <Text className="text-[26px] text-[#000000] font-Nunito-Bold text-center mt-[10px]">
                Are you sure you want to delete?
              </Text>
            </View>
            <View className="flex flex-row items-center gap-[15px] mt-[60px]  mb-[20px]">
              <TouchableOpacity
                className="bg-[#edc5d2] w-[165px] h-[60px] items-center justify-center rounded-2xl"
                onPress={closeDeleteAssistantBottomSheet}>
                <Text className="text-primary text-[16px] font-Nunito-Bold">
                  No
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-primary w-[165px] h-[60px] items-center justify-center rounded-2xl"
                onPress={deleteAssistant}>
                {/* Call the delete function */}
                <Text className="text-white text-[16px]  font-Nunito-Bold">
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default AssistantsScreen;

const styles = StyleSheet.create({});
