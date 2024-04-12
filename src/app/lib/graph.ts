import { Client } from "@microsoft/microsoft-graph-client"

let graphClient: any = undefined

function ensureClient(accessToken: any) {
  if (!graphClient) {
    graphClient = Client.init({
      authProvider: (done) => {
        done(null, accessToken)
      },
    })
  }
  return graphClient
}

export async function uploadDocument(accessToken: any, file: any, metadata: any) {
  const client = ensureClient(accessToken)

  const uploadPath = `/me/drive/root:/${metadata.path}/${file.name}:/content`
  await client.api(uploadPath).put(file)

  const metadataPath = `/me/drive/root:/${metadata.path}/${file.name}`
  await client.api(metadataPath).patch(metadata)
}

export async function updateDocumentMetadata(accessToken: any, id: any, metadata: any) {
  const client = ensureClient(accessToken)
  await client.api(`/me/drive/items/${id}`).patch(metadata)
}

export async function deleteDocument(accessToken: any, id: any) {
  const client = ensureClient(accessToken)
  await client.api(`/me/drive/items/${id}`).delete()
}

export async function getDocuments(accessToken: any, userId: any) {
  const client = ensureClient(accessToken)
  const path = `/me/drive/root:/{project_env}/{country}/{doc_type}/{doc_subtype}/${userId}`
  const response = await client.api(path).get()
  return response.value
}