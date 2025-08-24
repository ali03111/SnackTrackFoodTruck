import { useState } from 'react';
import { loginUser } from '../../Redux/Action/AuthAction';
import useReduxStore from '../../Hooks/UseReduxStore';
import { errorMessage } from '../../Config/NotificationMessage';
import { loginThunk, registerThunk } from '../../Redux/Sagas/AuthSaga';

const { default: useFormHook } = require('../../Hooks/UseFormHooks');
const { default: Schemas } = require('../../Utils/Validation');

/**
 * The function `useRegister` handles form submission, user registration, navigation, and policy
 * agreement in a React application.
 * @returns The `useRegister` function is returning an object with the following properties and
 * methods:
 */
const useRegister = ({ navigate, goBack }) => {
  const { handleSubmit, errors, reset, control, getValues } = useFormHook(
    Schemas.signUp,
  );
  const { dispatch } = useReduxStore();
  const [remember, setRemember] = useState(false);
  const rememberValue = () => {
    setRemember(!remember);
  };

  const signUpButton = ({ name, email, password }) => {
    console.log('signUpButton', name, email, password);
    dispatch(
      loginThunk({
        type: 'email',
        datas: { name, email, password },
      }),
    );
  };
  const loginNav = () => navigate('LoginScreen');

  const [policy, setPolicy] = useState(true);
  const PolicyValue = () => {
    setPolicy(!policy);
  };

  const socialLoginFun = type => {
    dispatch(registerThunk({ type, datas: {} }));
  };

  const onPress = () => navigate('LoginScreen');
  return {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    facebookLoginFunc: () => {},
    googleLoginFunc: () => {},
    PhoneNumberLoginFuc: () => {},
    remember,
    setRemember,
    rememberValue,
    goBack,
    loginNav,
    signUpButton,
    PolicyValue,
    policy,
    socialLoginFun,
    onPress,
  };
};

export default useRegister;
