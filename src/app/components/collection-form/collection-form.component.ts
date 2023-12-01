import { CommonModule } from '@angular/common'
import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'

import { CollectionModel, CurrenciesEnum, ERCEnum } from '../../types'

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
  ],
  templateUrl: './collection-form.component.html',
  styleUrl: './collection-form.component.scss',
})
export class CollectionFormComponent implements OnInit, OnDestroy {
  @Input() public collection: CollectionModel | undefined

  public currencies: string[] = Object.values(CurrenciesEnum)
  public ERCs: string[] = Object.values(ERCEnum)
  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    symbol: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: [0, [Validators.required]],
    totalAmount: [1, [Validators.required]],
    currency: [{ value: CurrenciesEnum.ETH, disabled: true }],
    erc: [{ value: ERCEnum.ERC721, disabled: true }],
  })

  public imageDataUrl$ = new BehaviorSubject<string>('')

  private destroy$ = new Subject<void>()

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value)
    })
  }

  public ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  public dropped([item]: NgxFileDropEntry[]): void {
    const fileEntry = item.fileEntry as FileSystemFileEntry
    fileEntry.file((file: File) => {
      const reader = new FileReader()
      reader.onload = () => {
        this.imageDataUrl$.next(reader.result as string)
      }
      reader.readAsDataURL(file)
    })
  }

  public clearImg(): void {
    this.imageDataUrl$.next('')
  }
}
