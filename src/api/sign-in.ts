import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  password: string
}

export interface SignInResponse {
  accessToken: string
}

export async function signIn({ email, password }: SignInBody) {
  const { data } = await api.post<SignInResponse>('/sellers/sessions', {
    email,
    password,
  })

  return data
}
