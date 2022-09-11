import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  productForm ! : FormGroup;

  constructor(private formBuilder : FormBuilder, private api : ApiService, @Inject(MAT_DIALOG_DATA) public editData : any, private dialogRef : MatDialogRef<DialogComponent>, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : ['',Validators.required],
      productCategory : ['',Validators.required],
      productCost : ['', Validators.min(1), '',Validators.required],
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
            this.snackBar.open("Product Added Successfully", "OK", {
              duration: 5000,
              verticalPosition: 'top'
            });
            this.productForm.reset();
            this.dialogRef.close('save');           
          },
          error:()=>{
            this.snackBar.open("Error while adding product", "OK", {
              duration: 5000,
              verticalPosition: 'top'
            })
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
        this.snackBar.open("Product updated Succesfully", "OK", {
          duration: 5000,
          verticalPosition: 'top'
        });
        this.productForm.reset();
        this.dialogRef.close('save');
      },
      error:()=>{
        this.snackBar.open("Error while updating the data", "OK", {
          duration: 5000,
          verticalPosition: 'top'
        });
      }
    })

  }

}

