import { useFieldArray } from 'react-hook-form';
import useFormHook from '../../Hooks/UseFormHooks';
import { timeDateArry } from '../../Utils/localDB';
import Schemas from '../../Utils/Validation';
import { useCallback, useState } from 'react';
import {
  formatTimeTo24Hour,
  getCustom12HourTime,
  getFormattedTime,
} from '../../Services/GlobalFunctions';
import { useMutation } from '@tanstack/react-query';
import { createLocationUrl } from '../../Utils/Urls';
import API from '../../Utils/helperFunc';
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
    register,
    handleSubmit: formHandleSubmit,
    clearErrors,
    reset,
    getFieldState,
    getValues,
    resetField,
    setError,
    setFocus,
    setValue,
    trigger,
    unregister,
    watch,
    errors,
  } = useFormHook(Schemas.addLocation, {
    operationDays: initialOperationDays,
  });

  const { fields, update } = useFieldArray({
    control,
    name: 'operationDays',
  });

  const toggleDaySelected = index => {
    const current = fields[index];
    update(index, {
      ...current,
      isSelected: !current.isSelected,
    });
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
    mutationFn: data => {
      console.log('Sending data to API:', data); // Debug log
      return API.post(createLocationUrl, data);
    },
    onSuccess: ({ ok, data }) => {
      console.log('API response:', { ok, data }); // Debug log
      if (ok) {
        successMessage('Post Created.');
        goBack();
        queryClient.invalidateQueries(['myLocationsList']);
      } else {
        errorMessage(data?.message || 'Failed to create location.');
      }
    },
    onError: error => {
      console.log('API error:', error); // Debug log
      errorMessage('Problem occurred while uploading data.');
    },
  });

  const onSubmit = useCallback(formData => {
    console.log('onSubmit triggered with formData:', formData); // Debug log
    const operationDays = fields
      .filter(day => day.isSelected)
      .map(day => ({
        day: day.day,
        startTime: day.startTime,
        endTime: day.endTime,
      }));

    const finalFormData = {
      ...formData,
      operationDays,
    };

    console.log('Final form data:', finalFormData); // Debug log
    mutateAsync({
      latitude: finalFormData?.truckLocation?.coords?.latitude ?? '5575',
      longitude: finalFormData?.truckLocation?.coords?.longitude ?? '527',
      parking: Boolean(finalFormData?.parkingAvailable === 1),
      seating: Boolean(finalFormData?.seatAvailable === 1),
      notes: finalFormData?.specialNotes,
      timings: {
        truckName: finalFormData.truckName,
        operationDays: finalFormData.operationDays,
      },
    });
  }, []);
  const toggleTimePicker = index => {
    setTimePickerState(index);
  };

  console.log('Returning handleSubmit:', formHandleSubmit(onSubmit)); // Debug log
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
    toggleTimePicker,
    timePickerState,
    afterSelectTime,
    isLoading,
  };
};

export default useAddLocationScreen;
