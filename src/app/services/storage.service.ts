import { Injectable } from '@angular/core'
import { FirebaseStorage } from '@firebase/storage'
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

import * as serviceAccount from '../../../fb-admin-account.json'
import { CollectionCreatingData } from '../types'

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

  constructor() {
    const app = initializeApp({
      apiKey: params.privateKey,
      projectId: params.projectId,
      authDomain: params.authUri,
      storageBucket: 'gs://nft-factory-78ab0.appspot.com',
    })
    this.storage = getStorage(app)

    // console.log(this.storageRef)
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
