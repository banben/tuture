import { useMemo } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { Layout, Menu, Icon, Modal } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { Slate } from 'slate-react';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import LayoutHeader from './LayoutHeader';
import DrawerComponent from './DrawerComponent';
import ChildrenDrawerComponent from './ChildrenDrawerComponent';
import {
  PAGE_CATAGUE,
  COLLECTION_CATALOGUE,
  COLLECTION_SETTING,
  CONTACT_US,
  NORMAL,
  COMMIT,
} from '../utils/constants';
import { initializeEditor } from '../utils/editor';

const { Header, Sider, Content } = Layout;

function ConnectedLayout(props) {
  const { children } = props;
  const { commitStatus } = useSelector((state) => state.versionControl);
  const { visible, drawerType } = useSelector((state) => state.drawer);

  const store = useStore();
  const value = useSelector(store.select.collection.nowArticleContent);

  const dispatch = useDispatch();

  const isLgBreakPoint = useMediaQuery({ query: '(max-width: 992px)' });

  function onToggleDrawer(toggleDrawerType) {
    if (isLgBreakPoint && drawerType === toggleDrawerType) {
      dispatch.drawer.setVisible(!visible);
    }

    if (isLgBreakPoint && !visible) {
      dispatch.drawer.setVisible(true);
    }

    dispatch.drawer.setDrawerType(toggleDrawerType);
  }

  function handleOk() {
    dispatch.versionControl.setCommitStatus(NORMAL);
  }

  function handleCancel() {
    dispatch.versionControl.setCommitStatus(NORMAL);
  }

  function onContentChange(val) {
    dispatch.collection.setArticleContent({ fragment: val });
  }

  const editor = useMemo(initializeEditor, []);

  return (
    <Slate editor={editor} value={value} onChange={onContentChange}>
      <Layout>
        <Sider
          onBreakpoint={(broken) => {
            dispatch.drawer.setVisible(!broken);
          }}
          css={css`
            height: 100vh;
            background-color: #f7f7fa;
            z-index: 1002;
          `}
          breakpoint="lg"
          collapsed
        >
          <div
            className="logo"
            css={css`
              text-align: center;
              margin-top: 16px;
            `}
          >
            <img src="/images/logo.svg" alt="" />
          </div>
          <Menu
            css={css`
              background-color: #f7f7fa;
              border: none;
            `}
            theme="light"
            mode="inline"
            defaultSelectedKeys={['1']}
          >
            <Menu.Item
              key="1"
              title="页面目录"
              style={{ marginTop: '40px' }}
              onClick={() => onToggleDrawer(PAGE_CATAGUE)}
            >
              <Icon type="file" />
            </Menu.Item>
            <Menu.Item
              key="2"
              title="文集目录"
              style={{ marginTop: '40px' }}
              onClick={() => onToggleDrawer(COLLECTION_CATALOGUE)}
            >
              <Icon type="switcher" />
            </Menu.Item>
            <Menu.Item
              key="4"
              title="文集设置"
              style={{ marginTop: '40px' }}
              onClick={() => onToggleDrawer(COLLECTION_SETTING)}
            >
              <Icon type="setting" />
            </Menu.Item>
            <Menu.Item
              key="5"
              title="联系我们"
              style={{ marginTop: '40px' }}
              onClick={() => onToggleDrawer(CONTACT_US)}
            >
              <Icon type="contacts" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          css={css`
            display: flex;
            flex-direction: row;
          `}
        >
          <Layout
            css={css`
              width: 300px;
              height: 100vh;
              position: ${isLgBreakPoint ? 'absolute' : 'static'};
            `}
          >
            <DrawerComponent />
          </Layout>
          <Layout
            css={css`
              box-shadow: -10px 0 15px rgba(0, 0, 0, 0.04);
              width: ${isLgBreakPoint ? '100%' : 'calc(100% - 300px)'};
              z-index: 1000;
            `}
          >
            <Header
              css={css`
                background-color: #fff;
                border-bottom: 1px solid rgba(232, 232, 232, 1);
              `}
            >
              <LayoutHeader />
            </Header>
            <Content
              css={css`
                background: #fff;
                display: flex;
                flex-direction: row;
              `}
            >
              <div
                css={css`
                  overflow: hidden;
                  position: relative;
                  height: calc(100vh - 64px);
                  width: 100%;
                `}
              >
                <ChildrenDrawerComponent />
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <Modal
        title="Basic Modal"
        visible={commitStatus === COMMIT}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Slate>
  );
}

export default ConnectedLayout;
