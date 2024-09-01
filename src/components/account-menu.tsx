import { getProfile } from '@/api/get-profile'
import { signOut } from '@/api/sign-out'
import { AvatarImage } from '@/components/avatar-image'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { useMutation, useQuery } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function AccountMenu() {
  const navigate = useNavigate()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 0, // CHECK CACHE BETWEEN LOGINS
  })

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      localStorage.removeItem('@rocketseat-marketplace/accessToken')
      navigate('/login', { replace: true })
    },
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center border-none"
        >
          {isLoadingProfile ? (
            <Skeleton className="h-12 w-12" />
          ) : (
            <AvatarImage avatar={profile?.seller.avatar} />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 border-none rounded-xl bg-white p-4 mt-2"
      >
        <DropdownMenuLabel className="flex flex-col">
          {isLoadingProfile ? (
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          ) : (
            <div className="flex items-center">
              <AvatarImage avatar={profile?.seller.avatar} size="sm" />
              <p className="ml-3 text-gray-300 text-body-sm">
                {profile?.seller.name}
              </p>
            </div>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-shape mx-2 my-4" />

        <DropdownMenuItem
          asChild
          className="text-orange-base"
          disabled={isSigningOut}
        >
          <button className="w-full" onClick={() => signOutFn()}>
            <span className="text-action-sm font-semibold">Sair</span>
            <LogOut className="ml-auto h-4 w-4" />
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
