import useReduxStore from '../../Hooks/UseReduxStore';

const useHomeScreen = () => {
  const { getState } = useReduxStore();
  const { userData } = getState('Auth');
  return { userData };
};
export default useHomeScreen;
