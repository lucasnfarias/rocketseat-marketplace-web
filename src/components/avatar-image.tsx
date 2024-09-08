import { UserRound } from 'lucide-react'

export interface AvatarImageProps {
  avatar:
    | {
        id: string
        url: string
      }
    | null
    | undefined
  size?: 'sm' | 'default'
}

const sizeClassName = {
  default: {
    defaultIcon: 'h-6 w-6',
    avatar: 'h-12 w-12 rounded-[12px] hover:border-blue-base',
    image: 'rounded-[12px]',
  },
  sm: {
    defaultIcon: 'h-4 w-4',
    avatar: 'h-8 w-8 rounded-[6px]',
    image: 'rounded-[6px]',
  },
}

export function AvatarImage({ avatar, size = 'default' }: AvatarImageProps) {
  return (
    <div
      className={`border border-shape bg-shape flex items-center justify-center ${sizeClassName[size].avatar}`}
    >
      {avatar ? (
        <img src={avatar.url} alt="" className={sizeClassName[size].image} />
      ) : (
        <UserRound
          className={`text-orange-base ${sizeClassName[size].defaultIcon}`}
        />
      )}
    </div>
  )
}
