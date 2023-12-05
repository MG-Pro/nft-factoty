import { CommonModule } from '@angular/common'
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

import { CollectionModel } from '../../types'

@Component({
  selector: 'app-quick-edit-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  templateUrl: './quick-edit-form.component.html',
  styleUrl: './quick-edit-form.component.scss',
})
export class QuickEditFormComponent implements OnInit {
  @Input() public collection: CollectionModel | undefined
  @Output() public saveData = new EventEmitter<Partial<CollectionModel> | null>()
  @HostBinding('class') private readonly classes = 'w-100'

  public form: FormGroup = this.fb.group({
    mintPrice: [0, [Validators.required]],
    totalAmount: [1, [Validators.required, Validators.min(1)]],
    maxItemsPerAddress: [10, [Validators.required, Validators.min(1)]],
    editable: [false, [Validators.required]],
  })

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    if (this.collection) {
      this.form.setValue({
        mintPrice: this.collection.mintPrice,
        totalAmount: this.collection.totalAmount,
        maxItemsPerAddress: this.collection.maxItemsPerAddress,
        editable: this.collection.editable,
      })
    }
  }

  public save(): void {
    this.saveData.emit(this.form.value)
  }

  public close(): void {
    this.saveData.emit(null)
  }
}
