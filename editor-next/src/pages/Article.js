import { useSelector } from 'react-redux';
import { Spin } from 'antd';

import { App } from '../components/';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

function Article() {
  const loading = useSelector(
    ({ loading }) => loading.models.collection || loading.models.diff,
  );

  return (
    <div>
      <Spin tip="加载中..." spinning={loading}>
        <div
          css={css`
            height: calc(100vh - 64px);
            width: 100%;
          `}
        >
          <App />
        </div>
      </Spin>
    </div>
  );
}

export default Article;
