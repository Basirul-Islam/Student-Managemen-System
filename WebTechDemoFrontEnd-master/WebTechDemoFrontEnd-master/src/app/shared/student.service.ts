import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Student } from '../model/student';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  private studentSubject: BehaviorSubject<Student> | any;
  public student: Observable<Student> | any ;

  public Url = "http://localhost:5001/bashir/student/" ;

  constructor(private formbuilder:FormBuilder, private http: HttpClient) 
  {
    this.studentSubject = new BehaviorSubject<Student>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.student = this.studentSubject.asObservable();
  }

  
  public addStudentAccount(){
    var bsseroll = this.formModel.value.BSSEROLL + "" ;
    var body = {
      "BSSEROLL": this.formModel.value.BSSEROLL,
      "password": this.formModel.value.Password,
      "Email": this.formModel.value.Email,
    }

    return this.http.post<any>(this.Url + "signUp", body);
  }
  public addStudentAccount2(){
    var bsseroll = this.formModel.value.BSSEROLL + "" ;
    var ph = this.formModel.value.BSSEROLL + "" ;
    var body = {
      "BSSEROLL": this.formModel.value.BSSEROLL,
      "HallName": this.formModel.value.HallName,
      "BatchNo": this.formModel.value.BatchNo,
      "StudentName": this.formModel.value.StudentName,
      "Session": this.formModel.value.Session,
      "Email": this.formModel.value.Email,
      "MobileNumber": this.formModel.value.MobileNumber,
    }

    return this.http.post<any>(this.Url + "signUp2", body);
  }


  public getAllStudents(){
    return this.http.get<any>(this.Url + "getAll") ;
  }

  public deleteAccount(bsseroll: any){
    console.log("service called " + bsseroll);


    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    
   

    return this.http.post<any>(this.Url + "delete", bsseroll, httpOptions) ;
  }

  public editStudentInfo(id: any){
    var body = {
      "Id": id,
      "BSSEROLL": this.formModel.value.BSSEROLL,
      "StudentName": this.formModel.value.StudentName,
      "Session": this.formModel.value.Session,
      "Email": this.formModel.value.Email,
      "MobileNumber": this.formModel.value.MobileNumber,
      "HallName": this.formModel.value.HallName,
      "BatchNo": this.formModel.value.BatchNo,
    }

    return this.http.post<any>(this.Url + "update", body);
  }

  public studentSignInOperation(){
    var body = {
      "Email": this.formModel.value.Email,
      "password": this.formModel.value.Password,
    }

    return this.http.post<any>(this.Url + "signIn", body) ;
  }

  formModel = this.formbuilder.group({
    StudentName: ['', Validators.required],
    BSSEROLL: ['', Validators.required],
    Email : ['', [Validators.email, Validators.required]],
    MobileNumber : ['', Validators.required],
    Session : ['', Validators.required],
    Password : ['', [Validators.required, Validators.minLength(6)]],
    HallName: ['', Validators.required],
    BatchNo: ['', Validators.required]
  });
  public storeStudentForEditStudentInfo: Student = new Student() ;



}
