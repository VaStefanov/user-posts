import { Input, InputNumber, Select } from 'antd';
import { ReactNode } from 'react';
import { filters, renderFilterType, Task } from './types';

export const renderFilter = ({
  type,
  options,
  name,
  value,
  onChange,
}: renderFilterType | any): ReactNode => {
  switch (type) {
    case 'select':
      return (
        <Select
          value={value}
          options={options}
          style={{ width: '250px' }}
          onChange={onChange}
        />
      );
    case 'number':
      return (
        <InputNumber
          style={{ width: '250px' }}
          onChange={onChange}
          name={name}
          value={value}
          type={type}
        />
      );
    case 'text':
      return (
        <Input
          style={{ width: '250px' }}
          onChange={onChange}
          name={name}
          value={value}
          type={type}
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
