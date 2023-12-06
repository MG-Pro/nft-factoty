import { Injectable } from '@angular/core'
import { FirebaseStorage } from '@firebase/storage'
import { TatumSDK, Network, Polygon } from '@tatumio/tatum'
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

import * as serviceAccount from '../../../fb-admin-account.json'
import { environment } from '../../environments/environment'
import { CollectionCreatingData, Metadata } from '../types'

const params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storage: FirebaseStorage
  private tatumClient: Polygon | undefined

  constructor() {
    const app = initializeApp({
      apiKey: params.privateKey,
      projectId: params.projectId,
      authDomain: params.authUri,
      storageBucket: 'gs://nft-factory-78ab0.appspot.com',
    })
    this.storage = getStorage(app)
  }

  public async init(): Promise<void> {
    this.tatumClient = await TatumSDK.init<Polygon>({
      network: Network.POLYGON,
      verbose: true,
      apiKey: {
        v4: environment.TATUM_API_KEY,
      },
    })
  }

  public async uploadImgToIPFS(data: CollectionCreatingData): Promise<void> {
    const fileResult = await this.tatumClient?.ipfs.uploadFile({ file: data.image })

    const md = {
      name: data.name,
      description: data.description,
      image: 'ipfs://' + fileResult?.data.ipfsHash,
    }

    const result = await this.tatumClient?.ipfs.uploadFile({ file: JSON.stringify(md) })
    console.log(result)
  }

  public async getCollectionMetadata(id: string): Promise<Metadata> {
    const md = await this.getMetadataFromIPFS(id)
    const imgId: string = md.image.split('//')?.[1]
    const image = await this.getImageFromIPFS(imgId)
    return { ...md, image }
  }

  public async getMetadataFromIPFS(id: string): Promise<Metadata> {
    const mdFR = new FileReader()
    try {
      const res = await this.tatumClient?.ipfs.getFile({
        id,
      })
      if (!res) {
        throw new Error()
      }
      mdFR.readAsText(res as Blob)

      return new Promise((resolve) => {
        mdFR.onload = () => {
          const md = JSON.parse(mdFR.result as string)
          resolve(md)
        }
      })
    } catch (e) {
      return Promise.resolve({} as Metadata)
    }
  }

  public async getImageFromIPFS(id: string): Promise<string> {
    const imgFR = new FileReader()
    try {
      const res = await this.tatumClient?.ipfs.getFile({
        id,
      })
      if (!res) {
        throw new Error()
      }
      imgFR.readAsDataURL(res as Blob)

      return new Promise((resolve) => {
        imgFR.onload = () => {
          resolve(imgFR.result as string)
        }
      })
    } catch (e) {
      return Promise.resolve('')
    }
  }

  public async uploadData(data: CollectionCreatingData): Promise<void> {
    const storageRef = ref(this.storage, data.image.name)
    const snap = await uploadBytes(storageRef, data.image, {
      customMetadata: {
        firebaseStorageDownloadTokens: uuidv4(),
      },
    })
    console.log(snap)
  }

  public async downloadData(name: string): Promise<string> {
    const storageRef = ref(this.storage, name)
    const url = await getDownloadURL(storageRef)
    console.log(url)

    return url
  }
}
