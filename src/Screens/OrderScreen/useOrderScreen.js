import { useState } from 'react';

const useOrderScreen = () => {
  const [selectedTab, setSelectedTab] = useState('New');
  return { selectedTab, setSelectedTab };
};
export default useOrderScreen;
