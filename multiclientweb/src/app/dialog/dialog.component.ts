import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  productForm ! : FormGroup;

  constructor(private formBuilder : FormBuilder, private api : ApiService, @Inject(MAT_DIALOG_DATA) public editData : any, private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : ['',Validators.required],
      productCategory : ['',Validators.required],
      productCost : ['',Validators.required],
      productDescription : ['',Validators.required]
    })
   if(this.editData){    
    this.productForm.controls['productName'].setValue(this.editData.productName);
    this.productForm.controls['productCategory'].setValue(this.editData.productCategory);
    this.productForm.controls['productCost'].setValue(this.editData.productCost);
    this.productForm.controls['productDescription'].setValue(this.editData.productDescription);
   }
  }

 
  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            alert("Product Added Successfully") 
            this.productForm.reset();
            this.dialogRef.close('save');           
          },
          error:()=>{
            alert("Error while adding product")
          }
        })
      }
    }
    else{
      this.updateProduct()
    }
  }

  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.productId)
    .subscribe({
      next:(res)=>{
        alert("Product updated Succesfully");
        this.productForm.reset();
        this.dialogRef.close('save');
      },
      error:()=>{
        alert("Error while updating the data");
      }
    })

  }

}