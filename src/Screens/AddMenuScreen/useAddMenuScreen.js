import { useState } from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import Schemas from '../../Utils/Validation';
import { useQuery } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import { getDietraiesUrl } from '../../Utils/Urls';

const useAddMenuScreen = () => {
  const [inputWidth, setInputWidth] = useState(20); // starting small

  const [modalState, setModalState] = useState(false);

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
  } = useFormHook(Schemas.addMenu);

  const { data } = useQuery({
    queryKey: ['dietries'],
    queryFn: () => API.get(getDietraiesUrl),
  });

  const onSubmit = data => {
    console.log('Form Data:', data);
    // Handle form submission logic here
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    inputWidth,
    setInputWidth,
    modalState,
    setModalState,
    allTags: data,
  };
};

export default useAddMenuScreen;
