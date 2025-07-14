import { useState, useRef, useEffect } from 'react'

interface ItemsPerPageSelectorProps {
  value: number
  onChange: (value: number) => void
  options?: number[]
}

export default function ItemsPerPageSelector({ 
  value, 
  onChange, 
  options = [5, 10, 15] 
}: ItemsPerPageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm text-gray-600 hover:bg-gray-50"
      >
        {value} per page
        <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'} text-xs`}></i>
      </button>
      
      {isOpen && (
        <div className="absolute bottom-full mb-1 left-0 bg-white border rounded-lg shadow-lg py-1 min-w-[120px]">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
              className={`w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 ${
                value === option ? 'text-green-600 bg-green-50' : 'text-gray-600'
              }`}
            >
              {option} per page
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 