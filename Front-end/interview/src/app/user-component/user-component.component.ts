import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { NgForm, NgModelGroup, FormGroup } from '@angular/forms'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.scss']
})
export class UserComponentComponent {
  Uploadfile: any;
  url = "http://localhost:3000/"
  constructor(private apiService: ApiServiceService) { }
  userData: any
  ngOnInit(): void {

    this.apiService.refreshNeededs.subscribe(() => {
      this.getUserData();

    })
    this.getUserData()


  }

  private getUserData() {
    this.apiService.userRouter().subscribe((result: any) => {
      this.userData = result.data
      console.log('user data', this.userData)
    })
  }
  FirstName: any
  onchange(name:any){
    console.log('name',name.target.value)
  }
  Usercreate(myForm: any) {
    console.log('myform', myForm.value.firstName)
    this.FirstName = myForm.value.firstName
    this.apiService.userCreate(myForm.value).subscribe((result: any) => {
      let data = result
      console.log('result', data)
      // Swal.fire(this.data.message);
    })
  }
  //delete
  UserDelete(id: any) {
    console.log('delete', id)
    this.apiService.userDelete(id).subscribe((result: any) => {
      let data = result
      console.log('result', data)
    })
  }

  UserUpload(images: any) {


  }
  form: any = FormGroup;
  uploadFile(noc: any) {
    if (noc.target.files) {
      var reader = new FileReader();
      this.Uploadfile = noc.target.files[0];
      reader.readAsDataURL(noc.target.files[0]);
      reader.onload = (event: any) => {
        // this.url = event.target.result;
        this.onCreateDirectory();
      };
      console.log('upload images', this.Uploadfile)
    }

  }

  onCreateDirectory() {
    this.apiService.usedirecCreate(this.FirstName).subscribe((data) => {
      console.log('create', data)
    });
  }

  imageupload() {
		const formData = new FormData();
		formData.append('images', this.Uploadfile);
		// formData.append('images', this.Uploadfile);
		this.apiService.userUpload(formData).subscribe((data) => {
			console.log('upload successfull!', data);
			if (data) {
				console.log('already existing data!');
			} else {
				console.log('not exising');
			}
		});
	}
}

