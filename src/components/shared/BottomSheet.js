import React, {forwardRef} from 'react';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';

const BottomSheet = forwardRef((props, ref) => {
  const {children, snapPoints} = props;

  return (
    <BottomSheetModal
      ref={ref}
      opacity={1}
      enablePanDownToClose={true}
      containerStyle={{backgroundColor: 'rgba(0,0,0,0.5)'}}
      snapPoints={snapPoints} // Default to content height
      // handleComponent={null}
    >
      <BottomSheetView className="flex-1">{children}</BottomSheetView>
    </BottomSheetModal>
  );
});

export default BottomSheet;
