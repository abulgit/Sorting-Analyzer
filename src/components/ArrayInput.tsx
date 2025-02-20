import { useState, useEffect } from 'react'

export default function ArrayInput({ setCustomArray }: { 
  setCustomArray: (input: string) => void 
}) {
  const [values, setValues] = useState<string[]>(Array(10).fill(''))

  const handleInputChange = (index: number, value: string) => {
    const newValue = value.replace(/[^0-9]/g, '') // Only allow numbers
    const newValues = [...values]
    newValues[index] = newValue
    setValues(newValues)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numbers = values
      .map(v => v.trim())
      .filter(v => v !== '')
      .join(',')
    setCustomArray(numbers)
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' && index < 9) {
      const nextInput = document.getElementById(`array-input-${index + 1}`)
      nextInput?.focus()
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      const prevInput = document.getElementById(`array-input-${index - 1}`)
      prevInput?.focus()
    }
  }

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6 flex flex-col space-y-2">
        <h3 className="font-semibold leading-none tracking-tight">Custom Array</h3>
        <p className="text-sm text-muted-foreground">Enter up to 10 numbers.</p>
      </div>
      <div className="p-6 pt-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-10 gap-2">
            {values.map((value, index) => (
              <div key={index} className="relative">
                <input
                  id={`array-input-${index}`}
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={2}
                  className="flex h-9 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-1 text-sm shadow-sm transition-colors text-zinc-900 dark:text-zinc-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 text-center"
                />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-1 bg-white dark:bg-zinc-950 text-xs text-zinc-400 dark:text-zinc-500">
                  {index}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setValues(Array(10).fill(''))}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              Clear
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 h-9 px-4 py-2"
            >
              Update Array
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 