'use client'

import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type Category = {
  name: string
  createdAt: string
}

type CategoryInputProps = {
  onSelectCategory: (category: string) => void
  selectedCategory?: string
}

export default function CategoryInput({ onSelectCategory, selectedCategory = '' }: CategoryInputProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(selectedCategory)

  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/category')
      const data = await res.json()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  const filtered = categories.filter(cat =>
    cat.name.toLowerCase().includes(inputValue.toLowerCase())
  )

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Delay and check if next active element is inside popover
    setTimeout(() => {
      const active = document.activeElement
      if (
        popoverRef.current &&
        active instanceof HTMLElement &&
        popoverRef.current.contains(active)
      ) {
        return
      }
      setOpen(false)
    }, 100)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Input
          placeholder="Select or create category"
          className='w-[300px]'
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onBlur={handleBlur}
        />
      </PopoverTrigger>
      <PopoverContent ref={popoverRef} className="p-0">
        <Command>
          <CommandInput
            placeholder="Search categories..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            {filtered.length > 0 ? (
              filtered.map((category) => (
                <CommandItem
                  key={category.name}
                  onSelect={() => {
                    setInputValue(category.name)
                    onSelectCategory(category.name)
                    setOpen(false)
                  }}
                >
                  {category.name}
                </CommandItem>
              ))
            ) : (
              <CommandEmpty>No category found. Press Enter to create.</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
