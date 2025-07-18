import useFormHook from '../../Hooks/UseFormHooks';
import Schemas from '../../Utils/Validation';

const useAddLocationScreen = () => {
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
  } = useFormHook(Schemas.logIn);

  return {
    control,
    errors,
  };
};
export default useAddLocationScreen;
