import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http:HttpClient) { }

  private _pageRefresh=new Subject<void>()
  get refreshNeededs(){
    return this._pageRefresh;
  }

  private enrollment=`http://localhost:3000/user/get`
  userRouter():Observable<any>{   
    return this.http.get(this.enrollment)
  }

  private create='http://localhost:3000/user/create'
  userCreate(data:any):Observable<any>{
    return this.http.post(this.create,data).pipe(
      tap(()=>{
        this._pageRefresh.next()
      })
    )
  }

  private Delete=`http://localhost:3000/user/delete`
  userDelete(id:any){
    const url=`${this.Delete}/?id=${id}`
    return this.http.delete(url).pipe(
      tap(()=>{
        this._pageRefresh.next()
      })
    )
  }

  private uploadImage=`http://localhost:3000/user/upload`
  userUpload(formData:any){
    return this.http.post(this.uploadImage,formData)
  }

  private direc=`http://localhost:3000/user/create/directory`
  usedirecCreate(dirName:any){
    return this.http.post<any>(this.direc,dirName)
  }
}


