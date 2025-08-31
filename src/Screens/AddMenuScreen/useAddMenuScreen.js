import { useState } from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import Schemas from '../../Utils/Validation';
import { useMutation, useQuery } from '@tanstack/react-query';
import API, { formDataFunc } from '../../Utils/helperFunc';
import { createMenuUrl, getDietraiesUrl } from '../../Utils/Urls';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import { getIdsFromArry } from '../../Services/GlobalFunctions';
import useReduxStore from '../../Hooks/UseReduxStore';

const useAddMenuScreen = ({ goBack }) => {
  const { queryClient } = useReduxStore();

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

  const { mutateAsync } = useMutation({
    mutationFn: data => {
      return formDataFunc(createMenuUrl, data, 'image');
    },
    onSuccess: ({ ok, data }) => {
      if (ok) {
        successMessage('Post Created.');
        goBack();
        queryClient.invalidateQueries(['myMenuList']);
      } else {
        errorMessage(data?.message);
      }
    },
    onError: ({ message }) => {
      errorMessage('Problem occurred while uploading data.');
    },
  });

  const onSubmit = data => {
    mutateAsync({
      name: data?.menuName,
      description: data?.description,
      image: data?.img,
      price: data?.price,
      dietary_information_ids: getIdsFromArry(data?.dietaryList, 'id'),
    });
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
    allTags: data?.data?.data ?? [],
  };
};

export default useAddMenuScreen;
