import { api } from '@/lib/axios'

export interface UploadAvatarBody {
  avatar: File
}

export interface UploadAvatarResponse {
  attachments: {
    id: string
    url: string
  }[]
}

export async function uploadAvatar({ avatar }: UploadAvatarBody) {
  const files = new FormData()
  files.append('files', avatar)

  const { data } = await api.post<UploadAvatarResponse>('/attachments', files)

  return data
}
