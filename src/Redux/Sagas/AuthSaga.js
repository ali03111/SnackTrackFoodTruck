import { types } from '../types';
import { updateAuth } from './AuthAction';
import { loadingFalse, loadingTrue } from './isloadingAction';
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

const loginObject = {
  Google: () => googleLogin(),
  facebook: () => faceBookLogin(),
  email: data => emailSignUp(data),
  appleID: () => appleIdlogin(),
};

export const loginThunk = (datas, type) => async dispatch => {
  dispatch(loadingTrue());
  try {
    const getLoginData = loginObject[type];
    const resultData = await getLoginData(datas);
    const { socialData, ok } = { socialData: resultData, ok: true };

    if (ok) {
      const idTokenResult = await getFbResult();
      const jwtToken = idTokenResult.token;

      if (jwtToken) {
        const { data, ok } = await registerService({
          token: jwtToken,
          first_name: datas?.first_name,
          last_name: datas?.last_name,
          email: datas?.email,
          password: datas?.password,
          phone: datas?.number,
          company_name: datas?.company_name,
        });

        if (ok) {
          dispatch(updateAuth(data));
        } else {
          errorMessage(data?.message);
        }
      }
    }
  } catch (error) {
    const errorStr =
      error?.message?.split(' ')?.slice(1)?.join(' ') ?? error.message;
    errorMessage(errorStr);
    console.log('Login Error:', error.toString());
  } finally {
    dispatch(loadingFalse());
  }
};

export const registerThunk = datas => async dispatch => {
  dispatch(loadingTrue());
  try {
    const result = await emailLogin(datas);
    const { data, ok } = { data: result, ok: true };

    if (ok) {
      const idTokenResult = await getFbResult();
      const jwtToken = idTokenResult.token;

      if (jwtToken) {
        const { data, ok } = await loginService({ token: jwtToken });

        if (ok) {
          dispatch(updateAuth(data));
        } else {
          errorMessage(data?.message);
        }
      }
    }
  } catch (error) {
    const errorStr =
      error?.message?.split(' ')?.slice(1)?.join(' ') ?? error.message;
    errorMessage(errorStr);
    console.log('Register Error:', error.toString());
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
