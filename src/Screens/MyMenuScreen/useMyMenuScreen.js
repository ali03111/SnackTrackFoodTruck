import { useQuery } from '@tanstack/react-query';
import { getMenuUrl } from '../../Utils/Urls';
import API from '../../Utils/helperFunc';

const useMyMenuScreen = () => {
  const { data } = useQuery({
    queryKey: ['myMenuList'],
    queryFn: () => API.get(getMenuUrl),
  });

  return {
    menuList: data?.data?.data,
  };
};

export default useMyMenuScreen;
