'use client'

import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@shortify/ui/components'
import { format, subDays } from 'date-fns'
import { CalendarIcon, ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface DateRangeFilterProps {
  onChange: (range: { from: Date, to?: Date }) => void
}

export function DateRangeFilter({ onChange }: DateRangeFilterProps) {
  // eslint-disable-next-line react-hooks-extra/prefer-use-state-lazy-initialization
  const [dateRange, setDateRange] = useState({ from: subDays(new Date(), 7), to: new Date() })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8'>
          <CalendarIcon className='h-4 w-4 mr-2' />
          {dateRange.from ? format(dateRange.from, 'MMM dd, yyyy') : 'Select date'}
          {' '}
          -
          {' '}
          {dateRange.to ? format(dateRange.to, 'MMM dd, yyyy') : 'Select date'}
          <ChevronDown className='h-4 w-4 ml-2' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='end'>
        <Calendar
          mode='range'
          selected={dateRange}
          onSelect={(range) => {
            if (range) {
              const from = range.from ?? range.to ?? new Date()
              setDateRange({ from, to: range.to ?? new Date() })
              onChange({ from, to: range.to })
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
