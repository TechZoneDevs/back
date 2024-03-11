import { Injectable, NestMiddleware } from '@nestjs/common';
import axios from 'axios';
import { auth } from 'express-oauth2-jwt-bearer';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json('Missing authorization code');
    }

    try {
      await this.getToken(req, res);
      req.headers['authorization'] = `Bearer ${req.oauth.access_token}`;

      const jwtCheck = auth({
        audience: 'https://APIQA.com',
        issuerBaseURL: 'https://dev-y2z5te2ymtplajjp.us.auth0.com/',
        tokenSigningAlg: 'RS256',
      });

      jwtCheck(req, res, next);
    } catch (error) {
      console.error('Error al obtener el token:', error.message);
      res.status(403).json(`Reason: ${error.message}`);
      next();
    }
  }

  private async getToken(req: any, res: any) {
    const { code } = req.query;
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;

    const data = new URLSearchParams();
    data.append('grant_type', 'authorization_code');
    data.append('client_id', CLIENT_ID);
    data.append('client_secret', CLIENT_SECRET);
    data.append('code', `${code}`);
    data.append('redirect_uri', 'http://localhost:3000/callback');

    const response = await axios.post('https://dev-y2z5te2ymtplajjp.us.auth0.com/oauth/token', data);

    console.log(response.data);

    req.oauth = response.data;
  }
}
