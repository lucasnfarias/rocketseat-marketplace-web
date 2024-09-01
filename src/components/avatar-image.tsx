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
    avatar: 'h-12 w-12',
  },
  sm: {
    defaultIcon: 'h-4 w-4',
    avatar: 'h-8 w-8',
  },
}

export function AvatarImage({ avatar, size = 'default' }: AvatarImageProps) {
  return (
    <div
      className={` border-[1px] border-shape p-1 rounded-[6px] flex items-center justify-center ${sizeClassName[size].avatar}`}
    >
      {avatar ? (
        <img src={avatar.url} alt="" />
      ) : (
        <UserRound
          className={`text-orange-base ${sizeClassName[size].defaultIcon}`}
        />
      )}
    </div>
  )
}
