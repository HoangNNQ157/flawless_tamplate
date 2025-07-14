// utils/getCurrentWeek.ts
export function getCurrentWeekDates(): string[] {
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay() + 1) // Start from Monday
  
    const days: string[] = []
  
    for (let i = 0; i < 5; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
  
      const weekday = date.toLocaleDateString("en-US", {
        weekday: "long",
      })
      const dayNumber = date.getDate()
  
      days.push(`${weekday} ${dayNumber}`)
    }
  
    return days
  }
  