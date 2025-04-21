import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import images from '../../../assets/images';
import CustomTextInput from '../../../components/shared/CustomTextInput';
import FooterBtn from '../../../components/shared/FooterBtn';

const AddMedicalRecords = ({navigation}) => {
  const [attachments, setAttachments] = useState([]);
  const [title, setTitle] = useState(null);
  const [note, setNote] = useState(null);

  // Function to add an attachment (Placeholder Box for now)
  const addAttachment = () => {
    setAttachments([...attachments, {id: Date.now()}]);
  };

  // Function to remove an attachment
  const removeAttachment = id => {
    setAttachments(attachments.filter(item => item.id !== id));
  };
  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
        {/* Title Input */}
        <View className=" mt-5">
          <CustomTextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Upload Attachment Section */}
        <View className="border border-pastelgreyBorder bg-pastelGrey rounded-2xl p-4 mb-[15px]">
          <View className=" flex-row justify-between items-center">
            <Text className="text-[16px] font-Nunito-Regular leading-4">
              Upload Attachment
            </Text>
            <TouchableOpacity onPress={addAttachment}>
              <Image
                source={images.upload}
                className=" h-[18px] w-4"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View className="flex-row gap-2 flex-wrap">
            {attachments.map(item => (
              <View
                key={item.id}
                className="relative w-16 h-16 bg-gray-300 rounded-lg mt-4">
                {/* Remove button (Top-right corner) */}
                <TouchableOpacity
                  onPress={() => removeAttachment(item.id)}
                  className="absolute -top-1 -right-1 bg-red-500 rounded-full">
                  <Image
                    source={images.primaryClose}
                    className=" h-[16px] w-[16px]"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View className="bg-pastelGrey border border-pastelgreyBorder rounded-2xl px-5 h-[100px] ">
          <TextInput
            className=""
            placeholder="Note"
            value={note}
            onChangeText={setNote}
            multiline
          />
        </View>
      </ScrollView>
      <FooterBtn title="Save" onClick={() => navigation.goBack()} />
    </View>
  );
};

export default AddMedicalRecords;
