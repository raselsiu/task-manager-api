const Sib = require("sib-api-v3-sdk");

require("dotenv").config();

const client = Sib.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
const tranEmailApi = new Sib.TransactionalEmailsApi();

const sendWelcomeEmail = (sName, rMail) => {
  const sender = {
    email: "raselsiu16@gmail.com",
    name: sName,
  };

  const receivers = [
    {
      email: rMail,
    },
  ];

  tranEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: "Welcome to Task-Manageg-API!",
      htmlContent: `
        <h1>Thanks for Creating Accounts on Task-Manager-API</h1>
        <h3>Hi i am   ${sName} - {{params.role}} developer!</h3>
        <p>
        Lorem ipsum dolor sit amet, ${sName} consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
        <p/>
        
                `,
      params: {
        role: "Frontend",
      },
    })
    .then((success) => {
      console.log(success);
    })
    .catch(console.log);
};

const sendCancellationEmail = (user, rMail) => {
  const sender = {
    email: "raselsiu16@gmail.com",
    name: "Task Manager API",
  };

  const receivers = [
    {
      email: rMail,
    },
  ];

  tranEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: `We missed you ${user} !`,
      htmlContent: `
        <h1>Sad for leaving Task-Manager-API</h1>
        <p>Goodbye ${user}, I hope to see you back sometime soon!</p> `,
      params: {
        role: "Frontend",
      },
    })
    .then((success) => {
      console.log(success);
    })
    .catch(console.log);
};

module.exports = { sendWelcomeEmail, sendCancellationEmail };
