// 📌 useAddLocationScreen.js
import { useFieldArray } from 'react-hook-form';
import useFormHook from '../../Hooks/UseFormHooks';
import { timeDateArry } from '../../Utils/localDB';
import Schemas, { addLocationSchema } from '../../Utils/Validation';
import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createLocationUrl } from '../../Utils/Urls';
import API, { formDataFunc } from '../../Utils/helperFunc';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';

const useAddLocationScreen = ({ goBack }) => {
  const { queryClient } = useReduxStore();
  const [timePickerState, setTimePickerState] = useState(null);

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const initialOperationDays = daysOfWeek.map(day => ({
    day,
    startTime: { time24: '--:--', time12: '--:--' },
    endTime: { time24: '--:--', time12: '--:--' },
    isSelected: false,
  }));

  const {
    control,
    handleSubmit: formHandleSubmit,
    reset,
    setValue,
    getValues,
    errors,
  } = useFormHook(Schemas.addLocation, { operationDays: initialOperationDays });

  const { fields, update } = useFieldArray({ control, name: 'operationDays' });

  const toggleDaySelected = index => {
    const current = fields[index];
    update(index, { ...current, isSelected: !current.isSelected });
  };

  const afterSelectTime = (index, startTime, endTime) => {
    const current = fields[index];
    const isValidStart = startTime.time24 !== '--:--';
    const isValidEnd = endTime.time24 !== '--:--';
    update(index, {
      ...current,
      startTime: isValidStart ? startTime : current.startTime,
      endTime: isValidEnd ? endTime : current.endTime,
      isSelected: isValidStart && isValidEnd,
    });
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: data => formDataFunc(createLocationUrl, data),
    onSuccess: ({ ok, data }) => {
      console.log('skldvnklsdnvklndsklvnlkdsvkdsvkdslvkds', data);
      if (ok) {
        successMessage('Post Created.');
        goBack();
        queryClient.invalidateQueries(['myLocationsList']);
      } else {
        errorMessage(data?.message || 'Failed to create location.');
      }
    },
    onError: () => errorMessage('Problem occurred while uploading data.'),
  });

  const onSubmit = useCallback(
    formData => {
      const operationDays = fields
        .filter(day => day.isSelected)
        .map(day => ({
          day: day.day,
          start_time: day.startTime?.time24,
          end_time: day.endTime?.time24,
        }));

      const finalFormData = { ...formData, operationDays };
      console.log('slkdbvklsdbvkldsbkvbsdkbvkbsdl', {
        latitude: finalFormData?.truckLocation?.coords?.latitude ?? '12.24',
        longitude: finalFormData?.truckLocation?.coords?.longitude ?? '56.78',
        parking: Boolean(finalFormData?.parkingAvailable === 1),
        seating: Boolean(finalFormData?.seatAvailable === 1),
        notes: finalFormData?.specialNotes,
        timings: operationDays,
      });
      mutateAsync({
        latitude: formData?.truckLocation?.coords?.latitude ?? '12.24',
        longitude: formData?.truckLocation?.coords?.longitude ?? '56.78',
        parking: Boolean(formData?.parkingAvailable === 1),
        seating: Boolean(formData?.seatAvailable === 1),
        notes: formData?.specialNotes,
        '[timings]': operationDays,
      });
    },
    [fields],
  );

  return {
    control,
    errors,
    handleSubmit: formHandleSubmit(onSubmit),
    setValue,
    getValues,
    reset,
    timeDateArry,
    fields,
    toggleDaySelected,
    toggleTimePicker: setTimePickerState,
    timePickerState,
    afterSelectTime,
    isLoading,
  };
};

export default useAddLocationScreen;
