import { registerSeller } from '@/api/register-seller'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ArrowRight, ImageUp } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const RegisterForm = z
  .object({
    avatar: z
      .custom<FileList>()
      .refine((files) => files?.length, 'Avatar is mandatory.')
      .refine(
        (files) => files[0]?.size <= MAX_FILE_SIZE,
        `Max image size is 5MB.`,
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.',
      ),
    name: z.string().min(1, 'Name is mandatory.'),
    phone: z.string().min(10, 'Phone is mandatory.'),
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
  })
  .refine((schema) => schema.password === schema.passwordConfirmation, {
    message: 'As senhas não são iguais!',
    path: ['passwordConfirmation'],
  })

type RegisterForm = z.infer<typeof RegisterForm>

export function Register() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterForm),
  })

  const { mutateAsync: registerNewSeller } = useMutation({
    mutationFn: registerSeller,
  })

  async function handleRegistration({
    avatar,
    name,
    phone,
    email,
    password,
    passwordConfirmation,
  }: RegisterForm) {
    try {
      const avatarFile = avatar[0]

      const files = new FormData()
      files.append('files', avatarFile)

      const data = await registerNewSeller({
        files,
        name,
        phone,
        email,
        password,
        passwordConfirmation,
      })
      console.log(data)
      toast.success('Cadastro realizado com sucesso', {
        action: {
          label: 'Login',
          onClick: () => navigate('/login'),
        },
      })
    } catch (error) {
      toast.error('Ocorreu um erro durante o cadastro. Tente novamente')
      console.error(error)
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="bg-white w-full flex-1 flex-col items-center justify-center rounded-xl px-20 py-[72px]">
        <div className="flex flex-col">
          <div className="mb-12">
            <h2 className="text-title-md text-gray-500 mb-2 font-dm-sans">
              Crie sua conta
            </h2>
            <p className="text-body-sm text-gray-300">
              Informe os seus dados pessoais e de acesso
            </p>
          </div>

          <form onSubmit={handleSubmit(handleRegistration)}>
            <div>
              <h3 className="text-gray-500 text-title-sm font-dm-sans mb-5">
                Perfil
              </h3>

              <Label
                htmlFor="avatar"
                className="flex items-center justify-center w-[120px] h-[120px] rounded-xl overflow-hidden bg-shape hover:cursor-pointer"
              >
                <ImageUp className="w-8 h-8 text-orange-base" />
                <Input
                  type="file"
                  id="avatar"
                  className=" hidden"
                  {...register('avatar')}
                />
              </Label>
              {errors.avatar && (
                <p className="text-rose-600 text-xs mt-1">
                  {errors.avatar.message?.toString()}
                </p>
              )}

              <Label htmlFor="name" className="block mt-5">
                Nome
              </Label>
              <Input
                type="text"
                id="name"
                placeholder="Seu Nome completo"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-rose-600 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}

              <Label htmlFor="phone" className="flex mt-5">
                senha
              </Label>
              <Input
                type="tel"
                id="phone"
                placeholder="(00) 00000-0000"
                {...register('phone')}
              />
              {errors.phone && (
                <p className="text-rose-600 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="mt-12">
              <h3 className="text-gray-500 text-title-sm font-dm-sans mb-5">
                Acesso
              </h3>

              <Label htmlFor="email">e-mail</Label>
              <Input
                type="email"
                id="email"
                placeholder="Seu e-mail"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-rose-600 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}

              <Label htmlFor="password" className="flex mt-5">
                senha
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Senha de acesso"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-rose-600 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}

              <Label htmlFor="confirm-password" className="flex mt-5">
                Confirmar senha
              </Label>
              <Input
                type="password"
                id="confirm-password"
                placeholder="Confirme sua senha"
                {...register('passwordConfirmation')}
              />
              {errors.passwordConfirmation && (
                <p className="text-rose-600 text-xs mt-1">
                  {errors.passwordConfirmation.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="h-[56px] flex items-center justify-between w-full bg-orange-base text-action-md text-white rounded-xl px-5 py-4 mt-12"
            >
              Cadastrar
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>
        </div>

        <div className="flex flex-col gap-5 mt-20">
          <h4 className="text-gray-300 text-body-md">Já tem tem uma conta?</h4>
          <Button
            type="button"
            asChild
            variant="outline"
            className="h-[56px] flex items-center justify-between w-full bg-white text-action-md text-orange-base rounded-xl px-5 py-4"
          >
            <Link to="/login">
              Acessar
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
