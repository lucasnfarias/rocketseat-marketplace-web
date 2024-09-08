import { api } from '@/lib/axios'

export interface UploadAttachmentsBody {
  files: FormData
}

export interface UploadAttachmentsResponse {
  attachments: {
    id: string
    url: string
  }[]
}

export async function uploadAttachments({ files }: UploadAttachmentsBody) {
  const { data } = await api.post<UploadAttachmentsResponse>(
    '/attachments',
    files,
  )

  return data
}
