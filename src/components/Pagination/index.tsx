import * as React from 'react';
import { Pagination, Stack } from '@mui/material';

interface IProps {
  color?: 'primary' | 'secondary' | 'standard'
  count: number
  page: number
  onPageChange: any
}

export default function RangePagination({ color, count, page, onPageChange }: IProps) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        defaultPage={page}
        siblingCount={0}
        boundaryCount={2}
        onChange={onPageChange}
        color={color ? color : 'primary'}
      />
    </Stack>
  );
}
