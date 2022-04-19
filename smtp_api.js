"use strict";
const nodemailer = require("nodemailer");


async function main() {
  
  let transporter = nodemailer.createTransport({
    host: "promos.brizymail.com",
    port: 587,
    secure: false, 
    auth: {
      user: "santosh", 
      pass: "santosh1024", 
    },
  });

let objCustomData={};
objCustomData.campaign_id=999;
objCustomData.creative_id=232;
objCustomData.currency="INR";

let arrCustomData=[];
arrCustomData.push(objCustomData.campaign_id);//0
arrCustomData.push(objCustomData.creative_id);//1
arrCustomData.push(objCustomData.currency);//2

let strCustomData= Buffer.from(arrCustomData.join("~")).toString('base64');

//let text_content="Hello  world?"
let text_content=`
Hi shweta          rohil,
Please <a href="http://www.amazon.in"> click here</a> to visit our new website.
`;
//let html_content="<b> Hello  world? </b>"
let html_content=`
Hi <b>shweta    rohil</b>,
<img src="https://shweta.in.ngrok.io/opens/?msg=${strCustomData}" height=1 width=1>
Please <a href="http://www.amazon.in"> click here</a> to visit our new website.
`;
 
function updateLinksInHTML(html) {
    var regex = /href\s*=\s*(['"])(https?:\/\/.+?)\1/gi;
    var link;
    while ((link = regex.exec(html_content)) !== null) {
    
      html = html.replace(
        link[2],
        "http://shweta.in.ngrok.io/landing/?msg=777~566~INR&url=" + link[2]
      );
    }
  
    return html;
  }
  
  let html_upt_content= updateLinksInHTML(html_content);
  console.log(html_upt_content);
  let info = await transporter.sendMail({
    from: '"Shweta Rohil" <shweta@brizymail.com>', 
    to: "mahesh@astute.ws", 
    //to: "shwetarohil@yahoo.com",
    //to: "santosh@astute.ws",
    subject: "Hello ✔", 
    text: text_content.replace(/  +/g," "), 
    html: html_upt_content.replace(/  +/g," "), 
    headers:{'X-job':strCustomData}
  });

  console.log("Message sent: %s", info.messageId);
  
}

main().catch(console.error);