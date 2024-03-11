
import { Injectable, NestMiddleware } from '@nestjs/common';
import axios from 'axios';
import { auth } from 'express-oauth2-jwt-bearer';

@Injectable()
export class ProductMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {

    const response = await this.getToken(req,res,next);

    // req.headers['authorization'] = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im9RZkRNMXJPM2FvQ1AxVW0zQXFsOSJ9.eyJpc3MiOiJodHRwczovL2Rldi15Mno1dGUyeW10cGxhampwLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhbmJIeTVFRjhObmR4SHcyaFEwYjJPcUxTaHh1a20wVkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9BUElRQS5jb20iLCJpYXQiOjE3MTAwMTEyOTEsImV4cCI6MTcxMDA5NzY5MSwiYXpwIjoiYW5iSHk1RUY4Tm5keEh3MmhRMGIyT3FMU2h4dWttMFYiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.d0wPJnVelFKNnNfYX0dmn01OdmiCUcuI3c3I7o3AdfYN5ilcRFFLcJLbxQQMmLsxU-pfOvf617OzCGVmfXSev-ifcYkZX3XG7cqt63Ix3SnVKk20uhQs8eflYWzVizng_VuCFzqFBKSmsAoRQyO16jbeVYjfSIFKAdNs-Nb781521BuhArQwWqED8lMYufmqxHQnv5M2K0_Br0D6MRoVcKHE4qy59vfP7JQS8mVgfkuD6oXhp58eZc7uNP9ctrjgTo8XC1goFhYY9bhu22oBZqsaxxkJi73iMK8tKoWIRFGefISiTb8nRNvzTpRnScXM4HUA8tuss0aUrGPUL40hgw';
    
    // const jwtCheck = auth({
    //   audience: 'https://APIQA.com',
    //   issuerBaseURL: 'https://dev-y2z5te2ymtplajjp.us.auth0.com/',
    //   tokenSigningAlg: 'RS256',
    // });

    // return jwtCheck(req, res, next);
  }
  private async getToken(req: any, res: any, next: () => void){

    try {
      const { code } = req.query;
      const CLIENT_ID = await process.env.CLIENT_ID;
      const CLIENT_SECRET = await  process.env.CLIENT_SECRET;

      console.log(CLIENT_ID,"anbHy5EF8NndxHw2hQ0b2OqLShxukm0V");
      if("TCOYyv8nyLa90F6S0-57ppXUXY5jj2tgKUsBGwc2_YBr_e9Eq6lEbfcn0x3tt3OC" == CLIENT_SECRET) console.log("son iguales");
      console.log(CLIENT_SECRET);
      
      const data = new URLSearchParams();
      data.append('grant_type', 'authorization_code');
      data.append('client_id', CLIENT_ID);
      data.append('client_secret', CLIENT_SECRET);
      data.append('code', `${code}`);
      data.append("redirect_uri", 'http://localhost:3000/callback');

      const response = await axios.post('https://dev-y2z5te2ymtplajjp.us.auth0.com/oauth/token', data);
  
      console.log(response.data);
  
      req.oauth = response.data;
      next();
    } catch (error) {
      console.error('Error al obtener el token:', error.message);
      res.status(403).json(`Reason: ${error.message}`);
    }
  }
}
