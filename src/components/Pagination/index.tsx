import * as React from 'react';
import { Pagination, Stack } from '@mui/material';

interface IProps {
  color?: 'primary' | 'secondary' | 'standard'
  count: number
  defaultPage: number
  page: number
  onPageChange: any
}

export default function RangePagination({ color, count, defaultPage, page, onPageChange }: IProps) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        defaultPage={defaultPage}
        page={page}
        siblingCount={0}
        boundaryCount={2}
        onChange={onPageChange}
        color={color ? color : 'primary'}
      />
    </Stack>
  );
}
