import { ApiService } from './../services/api.service';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  productForm !: FormGroup;
  actionBtn : string = "Salvar"
  constructor(private formBuilder : FormBuilder,
     private api : ApiService,
     @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : ['',Validators.required],
      autor : ['',Validators.required],
      data: ['',Validators.required]
    })

   if(this.editData){
     this.actionBtn = "Editar";
     this.productForm.controls['productName'].setValue(this.editData.productName);
     this.productForm.controls['autor'].setValue(this.editData.autor);
     this.productForm.controls['data'].setValue(this.editData.data);
   }

  }
  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            alert("Product added succesfully");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error em adicionar o produto")

          }
        })
      }
    }else{
      this.updateProduct()
    }

  }
  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product updated Succesfully")
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the record!!")
      }
    })
  }

}
