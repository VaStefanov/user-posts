import { Input, InputNumber, Select } from 'antd';
import { ReactNode } from 'react';
import {
  filters,
  ISelectFilterType,
  ITextInputFilterType,
  INumberInputFilterType,
  Task,
} from './types';

export const renderFilter = (
  data: ISelectFilterType | ITextInputFilterType | INumberInputFilterType
): ReactNode => {
  switch (data.type) {
    case 'select':
      return (
        <Select<boolean, { value: boolean; label: string }>
          value={data.value}
          options={data.options}
          style={{ width: '250px' }}
          onChange={data.onChange}
        />
      );
    case 'number':
      return (
        <InputNumber<number>
          style={{ width: '250px' }}
          onChange={data.onChange}
          name={data.name}
          value={data.value}
          type={data.type}
        />
      );
    case 'text':
      return (
        <Input
          style={{ width: '250px' }}
          onChange={data.onChange}
          name={data.name}
          value={data.value}
          type={data.type}
        />
      );
    default:
      break;
  }
};

export const filterData = (filters: filters, data: Task[]): Task[] => {
  const filterKeys: string[] = Object.keys(filters);
  const filterConditionals = Object.values(filters);
  let filteredData: Task[] = data;

  for (let i = 0; i < filterKeys.length; i++) {
    if (filterConditionals[i] === null) continue;
    if (filterKeys[i] === 'title') {
      filteredData = filteredData.filter((row: Task) =>
        (row as any)[filterKeys[i]].includes(filterConditionals[i])
      );
    } else {
      filteredData = filteredData.filter(
        (row: Task) =>
          row[filterKeys[i] as keyof Task] === filterConditionals[i]
      );
    }
  }

  return filteredData;
};
