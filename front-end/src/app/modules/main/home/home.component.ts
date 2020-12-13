import { Component, OnInit } from '@angular/core';
import { images } from '../../../data/constant/images';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  tableHeader = ['Datos a cargar',	'Nombre del archivo',	'Cantidad de datos',	'Validación de estructura',	'Validación de dependencias', 'Ver detalle'];
  tableBody = [['','','','','','']];
  tableBodyAux = [];
  numItems = [1,2,3,4,5,6,7,8,9,10];
  totalRec = this.tableBody.length;
  efaultValue = 'PM';
  itemsPerPage = 3;
  page: number = 1;
  maxSize = 5;
  fileName = "No hay archivos seleccionados";
  csvContent: any;
  cantUser: number = 0;
  users: Array<string> = [];
  centro: Array<string> = [];
  listOflist: string[][];
  files: File[] = [];
  msgModal = {};
  iconSucces = images.iconDarkSuccess;

  userArray2: User[] = [];

  constructor( private modal: NgbModal, private http: HttpClient ) { 

  }

  ngOnInit(): void {
  }

  pageChanged(event){}

  sendForm(contenido): void{
    let head: string;
    let bod: string;
    let ico = {};
    const err = 'Los datos suministrados no coinciden con la información en la aplicación, por favor vuelva a intentarlo.';
    const sucss = 'La información suministrada fue validada correctamente, por favor continúe registrando su usuario';
    head = 'Operación exitosa';
    bod = sucss ;
    ico = this.iconSucces;
    this.msgModal = {
      header : head,
      body   : bod,
      icon   : ico
    };
    this.modal.open(contenido, {backdrop: 'static' });
  }

  saveItem(varx: any){
    this.itemsPerPage = varx;
    console.log(this.csvContent);
    console.log(this.itemsPerPage);
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
    const formData = new FormData();
    for (var i = 0; i < this.files.length; i++) { 
      formData.append("file[]", this.files[i]);
    }
}



onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
}
ejemplo(){
  console.log("ilich");
}



  fileEvent(fileInput){
    //let file = fileInput.target.files[0];
    //fileEvent(fileInput: Event){ let file = (<HTMLInputElement>fileInput.target).files[0];
    let file = fileInput.addedFiles[0];
    if(file.type==="text/csv"){
      this.fileName = file.name;
      let fileReader: FileReader = new FileReader();
      let self = this;
      fileReader.onloadend = function(x) {
        self.csvContent = fileReader.result;
        let tableBodyCreate: Array<any[]>=[];
        let infoTableBody: Array<any[]>=[];
  
        let csvToRowArray = self.csvContent.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split("|");
          if(index === 1){
            for (var type in row) {
              tableBodyCreate.push([row[type]]);
            }
          }else{
            for (var type in row) {
              if(tableBodyCreate[type].indexOf(row[type])===-1) tableBodyCreate[type].push(row[type]);
            }
          }
        }
        let row = csvToRowArray[0].split("|");
        for (var type in row) {
          infoTableBody.push([row[type],self.fileName,tableBodyCreate[type].length,
          'green',
          'red',
          'button']);
        }
        self.tableBody = infoTableBody;
  
      }
      fileReader.readAsText(file);
    }else{
      this.fileName = "Tipo de formato no valido";
    }
    
  }

}

export class User{
  id: String;
  name: String;
  lastName: String;

  constructor(id: String, name: String, lastName: String){
    this.id = id;
    this.name = name;
    this.lastName = lastName;
  }
}
