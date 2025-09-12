import { useQuery } from '@tanstack/react-query';
import { getLocationUrl, getMenuUrl } from '../../Utils/Urls';
import API from '../../Utils/helperFunc';

const useMyLocationScreen = () => {
  const { data } = useQuery({
    queryKey: ['myLocationsList'],
    queryFn: () => API.get(getLocationUrl),
  });
  console.log('data from location list', data?.data);
  return {
    locationList: data?.data?.locations,
  };
};

export default useMyLocationScreen;
