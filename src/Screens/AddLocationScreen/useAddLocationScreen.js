import { useFieldArray } from 'react-hook-form';
import useFormHook from '../../Hooks/UseFormHooks';
import { timeDateArry } from '../../Utils/localDB';
import Schemas from '../../Utils/Validation';
import { useCallback, useState } from 'react';
import {
  formatTimeTo24Hour,
  getCustom12HourTime,
} from '../../Services/GlobalFunctions';

const useAddLocationScreen = () => {
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
    startTime: '--:--',
    endTime: '--:--',
    isSelected: false,
  }));

  const {
    control,
    register,
    handleSubmit,
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
    console.log(
      'jksdbvkjsbdjkbjksdbvkjsdbkvbdskjvbsd',
      index,
      startTime,
      endTime,
    );

    const current = fields[index];
    update(index, {
      ...current,
      startTime,
      endTime,
    });
  };
  // Copy of the default time array for local manipulation
  // const timeDateArry = [...defaultTimeDateArry];

  // Transform and inject operationDays before submit
  const onSubmit = useCallback(
    callback =>
      handleSubmit(formData => {
        const operationDays = [...timeDateArry]
          .filter(day => day.isSelected)
          .map(day => ({
            day: day.title,
            startTime: day.openTime,
            endTime: day.closeTime,
          }));

        const finalFormData = {
          ...formData,
          operationDays,
        };

        callback(finalFormData);
      })(),
    [handleSubmit, timeDateArry],
  );

  const toggleTimePicker = index => {
    setTimePickerState(index);
  };

  return {
    control,
    errors,
    handleSubmit: onSubmit, // use this in your component
    setValue,
    getValues,
    reset,
    timeDateArry, // pass to the component if needed
    fields,
    toggleDaySelected,
    toggleTimePicker,
    timePickerState,
    afterSelectTime,
  };
};

export default useAddLocationScreen;
