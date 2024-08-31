import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export function Login() {
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

          <form>
            <Label htmlFor="email">e-mail</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Seu e-mail cadastrado"
              className="mb-5"
            />

            <Label htmlFor="password">senha</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Sua senha de acesso"
            />

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
