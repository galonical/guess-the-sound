"use client";

import styled from "styled-components";
import { Layout } from "antd";

const StickyHeader = styled(Layout.Header)`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
`;

export default StickyHeader;
