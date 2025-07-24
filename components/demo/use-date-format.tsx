'use client'

import { useState } from 'react'
import { useDateFormat } from '../../registry/hooks/use-date-format'

export function DateFormatDemo() {
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const [customFormat, setCustomFormat] = useState('YYYY-MM-DD HH:mm:ss')
  const [locale, setLocale] = useState('en-US')

  // Common format examples
  const formatExamples = [
    { format: 'YYYY-MM-DD', label: 'ISO Date' },
    { format: 'MM/DD/YYYY', label: 'US Format' },
    { format: 'DD/MM/YYYY', label: 'EU Format' },
    { format: 'dddd, MMMM Do, YYYY', label: 'Full Date' },
    { format: 'h:mm:ss A', label: '12-hour Time' },
    { format: 'HH:mm:ss', label: '24-hour Time' },
    { format: 'YYYY-MM-DD [at] HH:mm', label: 'With Text' },
    { format: 'MMM Do, YYYY', label: 'Month Abbreviated' },
  ]

  const localeExamples = ['en-US', 'fr-FR', 'de-DE', 'ja-JP', 'es-ES', 'pt-BR', 'ru-RU', 'zh-CN']

  // Format the date with different examples
  const formattedExamples = formatExamples.map(example => ({
    ...example,
    result: useDateFormat(selectedDate, example.format, { locales: locale }),
  }))

  const customFormatted = useDateFormat(selectedDate, customFormat, { locales: locale })

  // Locale-specific formatting
  const localeFormatted = localeExamples.map(loc => ({
    locale: loc,
    result: useDateFormat(selectedDate, 'dddd, MMMM Do, YYYY', { locales: loc }),
  }))

  return (
    <div className="flex flex-col gap-6 p-4 border rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium flex items-center gap-2">
          📅 Date Format Demo
        </h3>
        <p className="text-sm text-gray-600">
          Format dates with customizable patterns and locales using a comprehensive set of format tokens.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Date and Format Controls */}
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded border">
            <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
              ⚙️ Controls
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Select Date:</label>
                <input
                  type="datetime-local"
                  value={selectedDate.toISOString().slice(0, 16)}
                  onChange={e => setSelectedDate(new Date(e.target.value))}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Custom Format:</label>
                <input
                  type="text"
                  value={customFormat}
                  onChange={e => setCustomFormat(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="YYYY-MM-DD"
                />
                <div className="mt-1 p-2 bg-white rounded border">
                  <span className="text-sm text-gray-600">Result: </span>
                  <span className="font-mono text-sm">{customFormatted}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Locale:</label>
                <select
                  value={locale}
                  onChange={e => setLocale(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {localeExamples.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Format Examples */}
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded border">
            <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
              📋 Format Examples
            </h4>
            <div className="space-y-2">
              {formattedExamples.map(example => (
                <div key={example.format} className="p-2 bg-white rounded border">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs text-gray-500">{example.label}</div>
                      <div className="font-mono text-sm">{example.format}</div>
                    </div>
                    <div className="font-mono text-sm text-green-700">{example.result}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Locale Examples */}
      <div className="p-4 bg-purple-50 rounded border">
        <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
          🌍 Locale Examples
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {localeFormatted.map(item => (
            <div key={item.locale} className="p-3 bg-white rounded border">
              <div className="text-xs text-gray-500 mb-1">{item.locale}</div>
              <div className="font-mono text-sm">{item.result}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Format Tokens Reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded border">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            📊 Year & Month
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-mono">YYYY</span>
              <span>{useDateFormat(selectedDate, 'YYYY')}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono">YY</span>
              <span>{useDateFormat(selectedDate, 'YY')}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono">MMMM</span>
              <span>{useDateFormat(selectedDate, 'MMMM', { locales: locale })}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono">MMM</span>
              <span>{useDateFormat(selectedDate, 'MMM', { locales: locale })}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono">MM</span>
              <span>{useDateFormat(selectedDate, 'MM')}</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded border">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            📅 Day & Weekday
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-mono">dddd</span>
              <span>{useDateFormat(selectedDate, 'dddd', { locales: locale })}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono">ddd</span>
              <span>{useDateFormat(selectedDate, 'ddd', { locales: locale })}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono">DD</span>
              <span>{useDateFormat(selectedDate, 'DD')}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono">Do</span>
              <span>{useDateFormat(selectedDate, 'Do')}</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded border">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            ⏰ Time
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-mono">HH:mm:ss</span>
              <span>{useDateFormat(selectedDate, 'HH:mm:ss')}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono">h:mm A</span>
              <span>{useDateFormat(selectedDate, 'h:mm A')}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono">SSS</span>
              <span>
                {useDateFormat(selectedDate, 'SSS')}
                ms
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 rounded border border-yellow-200">
        <h4 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
          💡 Format Tokens
        </h4>
        <div className="text-sm text-yellow-700 space-y-1">
          <p>
            <strong>Year:</strong>
            {' '}
            YYYY (2024), YY (24), Yo (2024th)
          </p>
          <p>
            <strong>Month:</strong>
            {' '}
            MMMM (January), MMM (Jan), MM (01), M (1), Mo (1st)
          </p>
          <p>
            <strong>Day:</strong>
            {' '}
            DD (01), D (1), Do (1st)
          </p>
          <p>
            <strong>Weekday:</strong>
            {' '}
            dddd (Sunday), ddd (Sun), dd (Su), d (0)
          </p>
          <p>
            <strong>Hour:</strong>
            {' '}
            HH (00-23), H (0-23), hh (01-12), h (1-12)
          </p>
          <p>
            <strong>Time:</strong>
            {' '}
            mm (minutes), ss (seconds), SSS (milliseconds)
          </p>
          <p>
            <strong>Meridiem:</strong>
            {' '}
            A (AM/PM), a (am/pm), AA (A.M./P.M.)
          </p>
          <p>
            <strong>Escape:</strong>
            {' '}
            [text] - literal text that won\'t be formatted
          </p>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        💡 Supports comprehensive date formatting with locale-aware month and weekday names, ordinal indicators, and custom text escaping.
      </div>
    </div>
  )
}
