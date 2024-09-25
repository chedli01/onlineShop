import { Router } from "express";
import {OAuth2Client} from "google-auth-library";

const route = Router();


async function getUserData(access_token) {

    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    
    //console.log('response',response);
    const data = await response.json();
    return data
  }

  route.get('/oauth', async function(req, res) {

    const code = req.query.code;

    try {
        const redirectURL = "http://127.0.0.1:3000/oauth"
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectURL
          );
        const r =  await oAuth2Client.getToken(code);
        // Make sure to set the credentials on the OAuth2 client.
        await oAuth2Client.setCredentials(r.tokens);
        // console.info('Tokens acquired.');
        const user = oAuth2Client.credentials;
        // console.log('credentials',user.email);
        const data=await getUserData(oAuth2Client.credentials.access_token);
        console.log(data)


      } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
    }


    res.redirect(303, 'http://localhost:5173/admindash');
  


});

export default route;