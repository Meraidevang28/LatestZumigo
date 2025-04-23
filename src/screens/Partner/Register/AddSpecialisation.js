// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Switch,
//   Image,
//   Dimensions,
// } from 'react-native';
// import React, {useState} from 'react';
// import FooterBtn from '../../../components/shared/FooterBtn';
// import screens from '../../../constants/screens';
// import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
// import {primary} from '../../../assets/theme/colors';
// import images from '../../../assets/images';
// import {styles} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/BottomSheetFlashList';

// const AddSpecialisation = ({navigation}) => {
//   const [selectedSpecialisation, setselectedSpecialisation] = useState([]);

//   const Specialisation = [
//     'Ophthalmologist',
//     'Dermatologist',
//     'Oncologist',
//     'Neurologist',
//     'Cardiologist',
//     'Orthopedic',
//     'Soft Tissue Surgeon',
//     'Chronic Ailments & Pain Medicine',
//     'Physiotherapist',
//     'Homeopathy & Alternative Medicine ',
//   ];

//   const {width, height} = Dimensions.get('window');
//   const imageHeight = height * 0.25;
//   const toggleSpecialisationSelection = specialisation => {
//     setselectedSpecialisation([specialisation]); // Only store the selected one
//   };
//   const [isEnabled, setIsEnabled] = useState(false);
//   const toggleSwitch = () => setIsEnabled(previousState => !previousState);
//   return (
//     <>
//       <View className="flex-1 bg-white px-6 ">
//         <ScrollView>
//           {/* Progress bar  */}
//           <View className="mt-[15px] mb-2">
//             <RegistrationProgressBar screenNo={3} />
//           </View>

//           {/* title  */}

//           <Text className=" mt-[15px] mb-[20px] text-[26px] text-darkGunmetal font-Nunito-Bold">
//             Specialisation Details
//           </Text>
//           <View className="flex-row justify-between items-center px-4 py-2 bg-[#f7f7f7] border-[0.5px] border-[#e2e3e1] h-[63px] rounded-[20px] mb-[10px]">
//             <Text
//               className="text-[16px] text-[#000000] font-Nunito-Regular"
//               style={{fontWeight: 400}}>
//               Are you a specialist?
//             </Text>
//             <Switch
//               trackColor={{false: '#ccc', true: primary}}
//               thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
//               ios_backgroundColor="#ccc"
//               onValueChange={toggleSwitch}
//               value={isEnabled}
//             />
//           </View>
//           {isEnabled ? (
//             <View>
//               <ScrollView
//                 className=" bg-white"
//                 showsVerticalScrollIndicator={false}>
//                 <Text className="text-[24px] font-Nunito-Bold mb-[10px]">
//                   Add your Specialisation
//                 </Text>
//                 <Text className="text-[18px] font-Nunito-Regular text-[#333333] mb-[15px]">
//                   You can choose one specialisation
//                 </Text>
//                 <View className="flex-row flex-wrap gap-2">
//                   {Specialisation.map((specialisation, index) => (
//                     <TouchableOpacity
//                       key={index}
//                       className={`rounded-2xl py-[14px] px-[15px] mb-2 border ${
//                         selectedSpecialisation.includes(specialisation)
//                           ? 'border border-[#e8d5db] bg-[#d75880] shadow-md-light'
//                           : 'bg-[#f3f6f7] border border-[#BBBCB7] shadow-md-light'
//                       }`}
//                       onPress={() =>
//                         toggleSpecialisationSelection(specialisation)
//                       }>
//                       <Text
//                         className={` text-[16px] leading-6  ${
//                           !selectedSpecialisation.includes(specialisation)
//                             ? ' text-[#838999] font-Nunito-Bold'
//                             : ' text-white font-Nunito-Bold'
//                         }`}>
//                         {specialisation}
//                       </Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               </ScrollView>
//             </View>
//           ) : (
//             <View className="flex-1 bg-white">
//               {/* Other screen content here */}

//               <View
//                 style={{
//                   position: 'absolute',
//                   bottom: -415,
//                   left: 0,
//                   right: 0,
//                   paddingHorizontal: 16,
//                   backgroundColor: 'white',
//                   alignItems: 'center',
//                 }}>
//                 <Image
//                   source={images.vaterinarianIcon}
//                   style={{
//                     width: width - 32, // full width minus padding
//                     height: imageHeight,
//                     resizeMode: 'contain',
//                   }}
//                 />
//               </View>
//             </View>
//           )}
//         </ScrollView>
//       </View>

//       <View
//         className="bg-white flex px-6 justify-center h-[100px] w-full"
//         style={{
//           shadowColor: '#000',
//           shadowOffset: {width: 50, height: 60}, // Adjust as needed
//           shadowOpacity: 50, // Lower for subtle shadows
//           shadowRadius: 10,
//           elevation: 18, // Android shadow
//         }}>
//         <TouchableOpacity
//           className="h-[60px] bg-primary items-center justify-center rounded-full"
//           onPress={() => {
//             navigation.navigate(screens.InfraSetup);
//           }}>
//           <Text className="text-[20px] text-white font-Nunito-Bold text-center">
//             Continue
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// };

// export default AddSpecialisation;
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import {primary} from '../../../assets/theme/colors';
import images from '../../../assets/images';

const AddSpecialisation = ({navigation}) => {
  const [selectedSpecialisation, setselectedSpecialisation] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);

  const Specialisation = [
    'Ophthalmologist',
    'Dermatologist',
    'Oncologist',
    'Neurologist',
    'Cardiologist',
    'Orthopedic',
    'Soft Tissue Surgeon',
    'Chronic Ailments & Pain Medicine',
    'Physiotherapist',
    'Homeopathy & Alternative Medicine ',
  ];

  const {width, height} = Dimensions.get('window');
  const imageHeight = height * 0.3;

  const toggleSpecialisationSelection = specialisation => {
    setselectedSpecialisation([specialisation]); // Only one selection allowed
  };

  const toggleSwitch = () => setIsEnabled(prev => !prev);

  return (
    <>
      <View className="flex-1 bg-white px-6">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Progress bar */}
          <View className="mt-[15px] mb-2">
            <RegistrationProgressBar screenNo={3} />
          </View>

          {/* Title */}
          <Text className="mt-[15px] mb-[20px] text-[26px] text-darkGunmetal font-Nunito-Bold">
            Specialisation Details
          </Text>

          {/* Switch */}
          <View className="flex-row justify-between items-center px-4 py-2 bg-[#f7f7f7] border-[0.5px] border-[#e2e3e1] h-[63px] rounded-[20px] mb-[10px]">
            <Text className="text-[16px] text-[#000000] font-Nunito-Regular">
              Are you a specialist?
            </Text>
            <Switch
              trackColor={{false: '#ccc', true: primary}}
              thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#ccc"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          {/* Specialisation selection */}
          {isEnabled && (
            <View>
              <Text className="text-[24px] font-Nunito-Bold mb-[10px]">
                Add your Specialisation
              </Text>
              <Text className="text-[18px] font-Nunito-Regular text-[#333333] mb-[15px]">
                You can choose one specialisation
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {Specialisation.map((specialisation, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`rounded-2xl py-[14px] px-[15px] mb-2 border ${
                      selectedSpecialisation.includes(specialisation)
                        ? 'border-[#e8d5db] bg-[#d75880]'
                        : 'bg-[#f3f6f7] border-[#BBBCB7]'
                    }`}
                    onPress={() =>
                      toggleSpecialisationSelection(specialisation)
                    }>
                    <Text
                      className={`text-[16px] leading-6 font-Nunito-Bold ${
                        selectedSpecialisation.includes(specialisation)
                          ? 'text-white'
                          : 'text-[#838999]'
                      }`}>
                      {specialisation}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </View>

      {/* 🖼️ Static image at the bottom */}
      {!isEnabled && (
        <View
          style={{
            position: 'absolute',
            bottom: 100, // above the footer
            left: 0,
            right: 0,
            alignItems: 'center',
            backgroundColor: 'white',
            paddingHorizontal: 16,
          }}>
          <Image
            source={images.vaterinarianIcon}
            style={{
              width: width - 32,
              height: imageHeight,
              resizeMode: 'contain',
            }}
          />
        </View>
      )}

      {/* Continue button */}
      <View
        className="bg-white flex px-6 justify-center h-[100px] w-full"
        style={{
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 6},
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 10,
        }}>
        <TouchableOpacity
          className="h-[60px] bg-primary items-center justify-center rounded-full"
          onPress={() => {
            navigation.navigate(screens.InfraSetup);
          }}>
          <Text className="text-[20px] text-white font-Nunito-Bold text-center">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddSpecialisation;
