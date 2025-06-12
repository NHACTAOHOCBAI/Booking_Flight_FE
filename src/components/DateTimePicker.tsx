/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, Form } from 'antd'
import { SlCalender } from 'react-icons/sl'
import { Dayjs } from 'dayjs'
import { ReactNode } from 'react'

interface DateTimePickerProps {
  label?: string
  name: string | (string | number)[]
  required?: boolean
  rules?: any[]
  placeholder?: string
  icon?: ReactNode
  disabledDate?: (current: Dayjs) => boolean
  disabledTime?: (current: Dayjs) => any
  showTime?: boolean
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  name,
  required = false,
  rules = [],
  placeholder = 'Select date and time',
  icon = <SlCalender />,
  disabledDate,
  disabledTime,
  showTime = true
}) => {
  return (
    <Form.Item
      label={
        label ? (
          <div className='flex items-center gap-2'>
            {icon}
            {label}
          </div>
        ) : undefined
      }
      name={name}
      rules={[...(required ? [{ required: true, message: `Please input ${label?.toLowerCase()}` }] : []), ...rules]}
    >
      <DatePicker
        size='large'
        className='w-full'
        format='DD MMM, YYYY, HH:mm'
        placeholder={placeholder}
        showTime={showTime ? { format: 'HH:mm' } : undefined}
        disabledDate={disabledDate}
        disabledTime={disabledTime}
      />
    </Form.Item>
  )
}

export default DateTimePicker
