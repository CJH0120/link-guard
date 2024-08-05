import * as React from 'react';
import { SVGProps, memo } from 'react';
export const IconMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" {...props}>
    <path
      fill="currentColor"
      d="M4 4h4v4H4V4ZM4 10h4v4H4v-4ZM8 16H4v4h4v-4ZM10 4h4v4h-4V4ZM14 10h-4v4h4v-4ZM10 16h4v4h-4v-4ZM20 4h-4v4h4V4ZM16 10h4v4h-4v-4ZM20 16h-4v4h4v-4Z"
    />
  </svg>
);
const Memo = memo(IconMenu);
export default Memo;
