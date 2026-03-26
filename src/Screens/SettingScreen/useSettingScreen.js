import useReduxStore from '../../Hooks/UseReduxStore';

const useSettingScreen = () => {
  const { dispatch } = useReduxStore();

  return {
    dispatch,
  };
};

export default useSettingScreen;
