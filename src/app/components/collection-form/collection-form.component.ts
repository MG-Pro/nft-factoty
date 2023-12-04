import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop'
import { BehaviorSubject } from 'rxjs'

import { CollectionCreatingData, CollectionModel, CurrenciesEnum, ERCEnum } from '../../types'

@Component({
  selector: 'app-collection-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxFileDropModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  templateUrl: './collection-form.component.html',
  styleUrl: './collection-form.component.scss',
})
export class CollectionFormComponent {
  @Input() public collection: CollectionModel | undefined
  @Output() public collectionData = new EventEmitter<CollectionCreatingData>()

  public currencies: string[] = Object.values(CurrenciesEnum)
  public ERCs: string[] = Object.values(ERCEnum)
  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    symbol: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
    description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(80)]],
    price: [0, [Validators.required]],
    totalAmount: [1, [Validators.required, Validators.min(1)]],
    mintCurrency: [{ value: CurrenciesEnum.ETH, disabled: true }, [Validators.required]],
    contractType: [{ value: ERCEnum.ERC721, disabled: true }, [Validators.required]],
    image: [null, [Validators.required]],
    editable: [false, [Validators.required]],
    maxItemsPerAddress: [10, [Validators.required, Validators.min(1)]],
  })

  public imageDataUrl$ = new BehaviorSubject<string>('')

  constructor(private fb: FormBuilder) {}

  public dropped([item]: NgxFileDropEntry[]): void {
    const fileEntry = item.fileEntry as FileSystemFileEntry
    fileEntry.file((file: File) => {
      const reader = new FileReader()
      reader.onload = () => {
        this.imageDataUrl$.next(reader.result as string)
      }
      reader.readAsDataURL(file)
      this.form.patchValue({ image: file })
    })
  }

  public clearImg(): void {
    this.imageDataUrl$.next('')
    this.form.patchValue({ image: null })
  }

  public emitCreate(): void {
    this.collectionData.emit(this.form.value)
  }
}
