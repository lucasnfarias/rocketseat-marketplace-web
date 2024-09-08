import { registerSeller } from '@/api/register-seller'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ArrowRight, ImageUp, Loader2 } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
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
        (files) => files && files[0]?.size <= MAX_FILE_SIZE,
        `Max image size is 5MB.`,
      )
      .refine(
        (files) => files && ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
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
    control,
    formState: { errors, isSubmitting: isRegistering },
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
            <h2 className="text-title-md font-dm-sans text-gray-500 mb-2">
              Crie sua conta
            </h2>
            <p className="text-body-sm text-gray-300">
              Informe os seus dados pessoais e de acesso
            </p>
          </div>

          <form onSubmit={handleSubmit(handleRegistration)}>
            <div className="flex flex-col">
              <h3 className="text-gray-500 text-title-sm font-dm-sans mb-5">
                Perfil
              </h3>

              <Controller
                name="avatar"
                control={control}
                render={({ field: { name, onChange, value } }) => {
                  return (
                    <Label
                      htmlFor="avatar"
                      style={{
                        backgroundImage: `url(${value && value[0] ? URL.createObjectURL(value[0]) : ''})`,
                      }}
                      className="z-0 group w-[120px] h-[120px] rounded-[20px] bg-center bg-cover hover:cursor-pointer transition-all relative"
                    >
                      {!value && (
                        <div className="-z-10 absolute flex flex-col items-center justify-center w-full h-full bg-shape text-gray-300 rounded-[20px]">
                          <ImageUp
                            className="h-8 w-8 text-orange-base"
                            strokeWidth={1.5}
                          />
                        </div>
                      )}

                      <div className="z-10 flex flex-col items-center justify-center w-full h-full bg-transparent text-transparent rounded-[20px] group-hover:bg-black group-hover:bg-opacity-30 group-hover:text-white">
                        <ImageUp className="h-8 w-8" strokeWidth={1.5} />
                      </div>

                      <Input
                        type="file"
                        id="avatar"
                        name={name}
                        className="hidden"
                        onChange={(e) => onChange(e.target.files)}
                      />
                      {errors.avatar && (
                        <p className="text-rose-600 text-xs mt-1 absolute top-0 left-32 w-[200px]">
                          {errors.avatar.message?.toString()}
                        </p>
                      )}
                    </Label>
                  )
                }}
              />

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
                telefone
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
              disabled={isRegistering}
            >
              Cadastrar
              {isRegistering ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
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
