import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileCreateInterface, ProfileListInterface, ProfilesDummies } from '../../data/model/profileListModel';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  private url = 'https://crud-test-c15ac.firebaseio.com';
  dataProfiles: ProfileListInterface[] = ProfilesDummies;

  constructor( private http: HttpClient ) { }

  createProfile( profile:ProfileCreateInterface ): any{
    console.log('REQUEST: Create Profile');
    console.log(profile);
    let resp = false;
    if(profile.profileName !== 'error'){
      resp = true;
    }
    return resp;
  }

  listProfiles(): any{
    return this.dataProfiles;
  }

  exampleHttpRequest( profile: ProfileListInterface): any{

    return this.http.post(`${ this.url }/tvs.json`, profile);

  }
  

}
