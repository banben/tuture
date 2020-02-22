import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer } from 'antd';

import { CREATE_ARTICLE, EDIT_ARTICLE } from '../utils/constants';

import CreateEditArticle from './CreateEditArticle';

const mapTypeToTitle = {
  [CREATE_ARTICLE]: '新建页面',
  [EDIT_ARTICLE]: '编辑页面',
};

function ChildrenDrawerComponent() {
  const dispatch = useDispatch();
  const { childrenDrawerType, childrenVisible } = useSelector(
    (state) => state.drawer,
  );

  function onClose() {
    dispatch.drawer.setChildrenVisible(false);
  }

  return (
    <Drawer
      title={mapTypeToTitle[childrenDrawerType]}
      placement="left"
      width={300}
      onClose={onClose}
      visible={childrenVisible}
      style={{
        marginLeft: '60px',
      }}
    >
      <CreateEditArticle childrenDrawerType={childrenDrawerType} />
    </Drawer>
  );
}

export default ChildrenDrawerComponent;