import {Text} from '@geist-ui/core';
import styled from 'styled-components';

const EllipsisText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default EllipsisText;
