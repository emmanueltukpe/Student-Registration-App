import jSend from 'jsend';

declare global {
  namespace Express {
    export interface Request {
      merchant: any;
      user: any;
      imagePath?: string;
      id: string;
    }

    export interface Response {
      body: any;
      jSend: jSend;
    }
  }
}
