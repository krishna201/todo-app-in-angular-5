import { Component } from '@angular/core';
import { element } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { userInfo } from 'os';
import jsondata from './data';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  edited = false;
  added = true;
  arraydata: Array<any> = [];
  userid: number;

  name: any;
  email: any;

  quoteCollection2: {
    id: number;
    name: string;
    email: string;
  }[];
  constructor(private httpClient: HttpClient) {
    // for (let i = 0; i < jsondata.length; i++) {
    //   console.log(jsondata[i]);
    //   this.quoteCollection2 = jsondata[i];
    //   this.arraydata.push(jsondata[i]);
    // }
    // console.log(this.arraydata);
    // this.quoteCollection2 = this.arraydata;

    this.get_all_data();

  }

  get_all_data() {

     this.httpClient
      .get('http://localhost:8088/api2/get_all_data')
      .subscribe(data => {
        console.log( data );
        this.quoteCollection2 = data[0];
      } );

  }

  updatedata( quoteGroup ) {
    console.log( quoteGroup );
    this.edited = true;
    this.added = false;
    this.name = quoteGroup.name;
    this.email = quoteGroup.email;
    this.userid = quoteGroup.userid;
  }


  adduserdata() {
     const userdetail = {
      name: this.name,
      email: this.email
     };
    console.log( userdetail );
     this.httpClient
      .get('http://localhost:8088/api2/add_data?name='  + userdetail.name + '&email=' + userdetail.email)
      .subscribe(data => {
        console.log( data );
        this.name = '';
        this.email = '';
        this.get_all_data();
      } );
  }



  deletedata( quoteGroup ) {
      this.httpClient
      .get('http://localhost:8088/api2/delete_data?userid='  + quoteGroup.userid)
      .subscribe(data => {
        console.log( data );
         this.get_all_data();
      } );
  }

  updateuserdata() {
    const userdetail = { name: this.name, email: this.email };
    console.log( this.userid );
    console.log( userdetail );

     this.httpClient
      .get('http://localhost:8088/api2/update_data?userid='  + this.userid + '&name=' + userdetail.name + '&email=' + userdetail.email)
      .subscribe(data => {
        console.log( data );
        this.name = '';
        this.email = '';
        this.added = true;
        this.edited = false;
         this.get_all_data();
      } );
}

uploadFile(event){
  const elem = event.target;
  // console.log(elem)
  if ( elem.files.length > 0 ) {
    console.log( elem.files[0] );
    const formData = new FormData();
    formData.append( 'file', elem.files[0] );
    this.httpClient
      .post( 'http://localhost:8088/api2/uploadimage', formData )
      .subscribe( ( data ) => {
        console.log( data );
      }, ( error ) => {
        console.log( error );
      } );

  }
}

}
