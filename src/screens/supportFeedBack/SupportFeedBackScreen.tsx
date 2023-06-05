import React, { useState } from 'react';
import SupportFeedBackView from './SupportFeedBackView';

const SupportFeedBackScreen: React.FC = ({ navigation }: any) => {
  const [openDropdown, setOpenDropDown] = useState<boolean>(false);
  const [value, setValue] = useState<any>(null);
  const [items, setItems] = useState<any>([
    { label: 'ANC Dev', value: 'ANC Dev' },
    { label: 'ANC Admin', value: 'ANC Admin' },
  ]);
  const onNavigate = (endpoint: string) => {
    navigation.navigate(endpoint);
  };
  return (
    <SupportFeedBackView
      onNavigate={onNavigate}
      openDropdown={openDropdown}
      setOpenDropDown={setOpenDropDown}
      value={value}
      setValue={setValue}
      items={items}
      setItems={setItems}
    />
  );
};

export default SupportFeedBackScreen;
