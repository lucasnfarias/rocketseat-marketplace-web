import { uploadAvatar } from '@/api/upload-avatar'
import { api } from '@/lib/axios'

export interface RegisterBody {
  avatar: File
  name: string
  phone: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface RegisterResponse {
  seller: {
    id: string
    name: string
    phone: string
    email: string
    avatar: {
      id: string
      url: string
    } | null
  }
}

export async function registerSeller({
  name,
  phone,
  avatar,
  email,
  password,
  passwordConfirmation,
}: RegisterBody) {
  const { attachments } = await uploadAvatar({ avatar })

  const { data } = await api.post<RegisterResponse>('/sellers', {
    name,
    phone,
    email,
    avatarId: attachments[0].id,
    password,
    passwordConfirmation,
  })

  return data
}
