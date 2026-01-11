import React, { useState } from 'react'
import { MdAddReaction } from 'react-icons/md';
import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

function Sidebar() {
    const [value, setValue] = useState(dayjs());
  return (
    <>
    
    <aside className="w-89 bg-white shrink-0">
      <div className="ms-8 py-6">
        <h1 className="text-xl font-bold mb-8">Listify</h1>
    
        {/* Calendar */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-3">
            {value.format('MMMM YYYY')}
          </h3>
    
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </LocalizationProvider>
        </div>
    
        {/* Tasks */}
        <div className="mb-6 w-70">
          <h3 className="text-sm font-semibold mb-2">Tasks</h3>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Today</span>
            <span>2</span>
          </div>
        </div>
    
        {/* Lists */}
        <div className='w-70'>
          <h3 className="text-sm font-semibold mb-2">Lists</h3>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Daily Routine</span>
            <span>1</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Study</span>
            <span>0</span>
          </div>
        </div>
      </div>
    </aside>
    </>
  )
}

export default Sidebar