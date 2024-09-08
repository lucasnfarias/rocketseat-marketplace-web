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
import { Loader2, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

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

  async function handleSignOut() {
    toast.promise(signOutFn(), {
      loading: (
        <div className="flex w-full items-center justify-between">
          Deslogando...
          <Loader2 className="ml-auto h-4 w-4 animate-spin" />
        </div>
      ),
      success: 'Deslogando com sucesso!',
      error: 'Ocorreu um erro ao tentar deslogar.',
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center border-none rounded-[12px] m-0 p-0"
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
              <p className="ml-3 text-gray-300 text-body-sm font-normal">
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
          <button className="w-full" onClick={handleSignOut}>
            <span className="text-action-sm font-semibold">Sair</span>
            {isSigningOut ? (
              <Loader2 className="ml-auto h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="ml-auto h-4 w-4" />
            )}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
