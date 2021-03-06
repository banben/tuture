import React, { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer } from 'antd';

import {
  COLLECTION_CATALOGUE,
  COLLECTION_SETTING,
  CONTACT_US,
} from 'utils/constants';

import CollectionCatalogue from './CollectionCatalogue';
import CollectionSetting from './CollectionSetting';
import ContactUs from './ContactUs';

import { RootState, Dispatch } from 'store';

const mapTypeToTitle: { [key: string]: string } = {
  [COLLECTION_CATALOGUE]: '文集目录',
  [COLLECTION_SETTING]: '文集设置',
  [CONTACT_US]: '联系我们',
};

const mapTypeToComponent: { [key: string]: ReactNode } = {
  [COLLECTION_CATALOGUE]: <CollectionCatalogue />,
  [COLLECTION_SETTING]: <CollectionSetting />,
  [CONTACT_US]: <ContactUs />,
};

function DrawerComponent() {
  const dispatch = useDispatch<Dispatch>();
  const { drawerType, visible } = useSelector(
    (state: RootState) => state.drawer,
  );

  const RenderComponent = mapTypeToComponent[drawerType];

  const handleClose = () => {
    dispatch.drawer.setVisible(false);
    dispatch.drawer.setSelectedKeys([]);
  };

  return (
    <Drawer
      title={mapTypeToTitle[drawerType]}
      placement="left"
      width={300}
      visible={visible}
      onClose={handleClose}
      headerStyle={{
        background: '#F7F7FA',
      }}
      drawerStyle={{
        background: '#F7F7FA',
      }}
      zIndex={11}
      style={{ marginLeft: '80px' }}
    >
      {RenderComponent}
    </Drawer>
  );
}

export default DrawerComponent;
