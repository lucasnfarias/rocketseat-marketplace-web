export interface CategoryChipProps {
  category: {
    id: string
    title: string
    slug: string
  }
}

export function CategoryChip({ category }: CategoryChipProps) {
  return (
    <span className="text-label-sm text-white uppercase bg-gray-400 px-2 py-1 rounded-full">
      {category.title}
    </span>
  )
}
