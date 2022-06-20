export class Ressource {
    id: number = -1;
    class: number;
    path: string = "";
    type: string = "";
 
    filename: string = "";
    filedata: string = "";
  
    constructor(filename?:string){
      if(filename !== undefined)
        this.filename = filename;
    }
  
  }