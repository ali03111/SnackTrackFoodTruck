import { types } from '../types';
import {
  appleIdlogin,
  emailLogin,
  emailSignUp,
  faceBookLogin,
  forgotPasswordServices,
  googleLogin,
} from '../../Utils/SocialLogin';
import {
  fcmRegService,
  getFbResult,
  logOutFirebase,
  loginService,
  registerService,
  updateProfileServices,
} from '../../Services/AuthServices';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import NavigationService from '../../Services/NavigationService';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import { loadingTrue, loadingFalse } from '../Action/isloadingAction';
import { updateAuth } from '../Action/AuthAction';

const loginObject = {
  Google: () => googleLogin(),
  facebook: () => faceBookLogin(),
  email: data => emailSignUp(data),
  appleID: () => appleIdlogin(),
};

export const loginThunk =
  ({ datas, type }) =>
  async dispatch => {
    console.log('loginThunk', datas, type);
    dispatch(loadingTrue());
    try {
      const loginFunction = loginObject[type];
      if (!loginFunction) {
        throw new Error(`Login type ${type} not supported`);
      }
      const resultData = await loginFunction(datas); // Pass datas directly
      const { socialData, ok } = resultData || { socialData: null, ok: true }; // Default to safe values

      console.log('Login Resuldssdvsdt:', resultData);
      if (true) {
        // const idTokenResult = await getFbResult(resultData);

        const jwtToken = resultData?.firebaseToken;
        console.log('Login Resuldssdvsdt:', jwtToken, resultData);
        const uniqueID = await getUniqueId();
        if (jwtToken) {
          const { data, ok: registerOk } = await registerService({
            name: datas?.name || '',
            device_id: uniqueID,
            firebase_token: jwtToken,
            type: 'truck',
          });
          console.log('Login Error:', data, {
            name: datas?.name || '',
            device_id: uniqueID,
            firebase_token: jwtToken,
            type: 'truck',
          });
          if (registerOk) {
            dispatch(updateAuth({ ...data, deviceId: uniqueID }));
          } else {
            errorMessage(data?.message || 'Registration failed');
          }
        } else {
          throw new Error('No JWT token received');
        }
      }
    } catch (error) {
      const errorStr = error?.message || 'Unknown error occurred';
      errorMessage(errorStr);
      // console.log('Login Error:', error.toString());
    } finally {
      dispatch(loadingFalse());
    }
  };

export const registerThunk =
  ({ datas }) =>
  async dispatch => {
    dispatch(loadingTrue());
    try {
      const result = await emailLogin(datas);
      const { data, ok } = { data: result, ok: true };

      if (true) {
        const idTokenResult = await getFbResult();
        const jwtToken = idTokenResult.token;
        const uniqueID = await getUniqueId();
        if (jwtToken) {
          const { data, ok } = await loginService({
            device_id: uniqueID,
            firebase_token: jwtToken,
            type: 'truck',
          });
          console.log('Register Error:', data);
          if (ok) {
            dispatch(updateAuth({ ...data, deviceId: uniqueID }));
          } else {
            errorMessage(data?.message);
          }
        }
      }
    } catch (error) {
      console.log('Register Error:', error);
      const errorStr =
        error?.message?.split(' ')?.slice(1)?.join(' ') ?? error.message;
      errorMessage(errorStr);
    } finally {
      dispatch(loadingFalse());
    }
  };

export const logoutThunk = () => async dispatch => {
  try {
    dispatch({ type: types.LogoutType });
    await logOutFirebase();
    console.log('Logged out successfully');
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    dispatch(loadingFalse());
  }
};

export const updateProfileThunk = profileData => async dispatch => {
  dispatch(loadingTrue());
  try {
    const { ok, data } = await updateProfileServices(profileData);
    if (ok) {
      dispatch({ type: types.UpdateProfile, payload: data.data });
      // successMessage('Your profile has been updated');
    }
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    setTimeout(() => {
      dispatch(loadingFalse());
    }, 2000);
  }
};

export const fcmRegisterThunk = token => async () => {
  await fcmRegService(token);
};

export const forgotPasswordThunk = email => async dispatch => {
  try {
    dispatch(loadingTrue());
    await forgotPasswordServices(email);
    successMessage('Password Reset Request has been sent to your mail');
    NavigationService.navigate('LoginScreen');
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    setTimeout(() => {
      dispatch(loadingFalse());
    }, 1000);
  }
};
