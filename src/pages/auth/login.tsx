import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type SignInForm = z.infer<typeof signInForm>

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

  function handleSignIn(data: SignInForm) {
    alert(JSON.stringify(data, null, 2))
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="bg-white w-full flex-1 flex-col items-center justify-center rounded-xl px-20 py-[72px]">
        <div className="flex flex-col">
          <div className="mb-12">
            <h2 className="text-title-md text-gray-500 mb-2">
              Acesse sua conta
            </h2>
            <p className="text-body-sm text-gray-300">
              Informe seu e-mail e senha para entrar
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)}>
            <Label htmlFor="email">e-mail</Label>
            <Input
              type="email"
              id="email"
              placeholder="Seu e-mail cadastrado"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-rose-600 text-xs mt-1">
                {errors.email.message}
              </p>
            )}

            <Label htmlFor="password" className="mt-5">
              senha
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Sua senha de acesso"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-rose-600 text-xs mt-1">
                {errors.password.message}
              </p>
            )}

            <Button
              type="submit"
              className="h-[56px] flex items-center justify-between w-full bg-orange-base text-action-md text-white rounded-xl px-5 py-4 mt-12"
            >
              Acessar
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>
        </div>

        <div className="flex flex-col gap-5 mt-20">
          <h4 className="text-gray-300 text-body-md">
            Ainda não tem uma conta?
          </h4>
          <Button
            type="button"
            asChild
            variant="outline"
            className="h-[56px] flex items-center justify-between w-full bg-white text-action-md text-orange-base rounded-xl px-5 py-4"
          >
            <Link to="sign-up">
              Cadastrar
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
