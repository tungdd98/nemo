import { CommonTestUnit } from '@nemo/common-test-unit';
import React, { FC, memo } from 'react';

const TestScreen: FC = () => {
  return <div>
    <CommonTestUnit />
  </div>;
};

export default memo(TestScreen);
