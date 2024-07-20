import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  constructor(private http: HttpClient) { }

    // GET
    public get (url:string){
      return this.http.get(url);
    }
    
/*     // GET ONE
    public getOne(url: string, id: string) {
      const urlWithId = `${url}/${id}`; // Concatenamos el ID al URL
      return this.http.get(urlWithId);
    }
   */
    // DELETE
    public delete (url:string){
      return this.http.delete(url);
    }
  
    // POST 
    public post (url:string, data:any){
      return this.http.post(url, data);
    }
  
      // PATCH
    public patch (url:string, data:any, options?: any){
      const elemento = `${url}`; 
      return this.http.patch(elemento, data, options); 
    }
}
