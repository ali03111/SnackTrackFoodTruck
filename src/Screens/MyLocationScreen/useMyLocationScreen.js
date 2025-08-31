import { useQuery } from '@tanstack/react-query';
import { getLocationUrl, getMenuUrl } from '../../Utils/Urls';
import API from '../../Utils/helperFunc';

const useMyLocationScreen = () => {
  const { data } = useQuery({
    queryKey: ['myLocationsList'],
    queryFn: () => API.get(getLocationUrl),
  });

  return {
    locationList: data?.data?.data,
  };
};

export default useMyLocationScreen;
