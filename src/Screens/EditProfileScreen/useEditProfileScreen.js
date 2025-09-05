import { useMutation } from '@tanstack/react-query';
import useFormHook from '../../Hooks/UseFormHooks';
import useReduxStore from '../../Hooks/UseReduxStore';
import Schemas from '../../Utils/Validation';
import { updateProfileUrl } from '../../Utils/Urls';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import { formDataFunc } from '../../Utils/helperFunc';
import { types } from '../../Redux/types';
import { useState } from 'react';

const useEditProfileScreen = () => {
  const { getState, dispatch } = useReduxStore();
  const { userData } = getState('Auth');
  const { handleSubmit, errors, reset, control, getValues } = useFormHook(
    Schemas.editProfile,
  );
  const [profileImg, setProfileImg] = useState(null);

  const { mutateAsync } = useMutation({
    mutationFn: data => {
      return formDataFunc(updateProfileUrl, data, 'image');
    },
    onSuccess: ({ ok, data }) => {
      console.log('sldkbvklsdbvklsbdklvbskldbvsdkvbksd', data);
      if (ok) {
        successMessage('Your profile updated sucessfully!');
        if (data.user?.name) {
          dispatch({
            type: types.UpdateProfile,
            payload: data.user,
          });
        }
      } else {
        errorMessage(data?.message);
      }
    },
    onError: ({ message }) => {
      errorMessage('Problem occurred while uploading data.');
    },
    retry: true,
  });
  console.log('profileImgprofileImgprofileImgprofileImgprofileImg', profileImg);
  const updateUser = ({ name }) =>
    mutateAsync({
      image: profileImg,
      name,
    });
  return {
    userData,
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    updateUser,
    profileImg,
    setProfileImg,
  };
};

export default useEditProfileScreen;
