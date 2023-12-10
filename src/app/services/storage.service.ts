import { Injectable } from '@angular/core'
import { Network, Polygon, TatumSDK } from '@tatumio/tatum'

import { CollectionCreatingData, Metadata } from '../types'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly TATUM_API_KEY = import.meta.env['NG_APP_TATUM_API_KEY']
  private tatumClient: Polygon | undefined

  public async init(): Promise<void> {
    this.tatumClient = await TatumSDK.init<Polygon>({
      network: Network.POLYGON,
      verbose: false,
      // apiKey: {
      //   v4: this.TATUM_API_KEY,
      // },
    })
  }

  public async getCollectionMetadata(id: string): Promise<Metadata> {
    const md = await this.getMetadataFromIPFS(id)
    const imgId: string = md.image.split('//')?.[1]
    const image = await this.getImageFromIPFS(imgId)
    console.log(md)
    return { ...md, image }
  }

  public async uploadDataToIPFS(data: CollectionCreatingData): Promise<string | null> {
    const fileHash = await this.uploadImgToIPFS(data)

    if (!fileHash) {
      return null
    }

    const md = {
      name: data.name,
      description: data.description,
      image: 'ipfs://' + fileHash,
    }

    try {
      const result = await this.tatumClient?.ipfs.uploadFile({ file: JSON.stringify(md) })
      return result?.data.ipfsHash || null
    } catch (e) {
      return null
    }
  }

  public async uploadImgToIPFS(data: CollectionCreatingData): Promise<string | null> {
    try {
      const res = await this.tatumClient?.ipfs.uploadFile({ file: data.image })

      return res?.data.ipfsHash || null
    } catch (e) {
      return null
    }
  }

  private async getMetadataFromIPFS(id: string): Promise<Metadata> {
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

  private async getImageFromIPFS(id: string): Promise<string> {
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
}
