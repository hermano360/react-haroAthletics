const nodemailer = require('nodemailer')

module.exports = {
  sendEmail: function(lat,lng,reportType,category,formattedAddress,moreInfo,level,name,email,phone,date){
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth:{
        user:'hermano360@gmail.com',
        pass:'opportunity1'
      }
    },{
      from:'AquaData <hermano360@gmail.com>'
    });

    console.log('SMTP Configured');
    let contactInfo = '<span></span>';
    let levelInfo = '<span></span>';
    let moreInfoMessage='<span></span>';
    let phoneInfo = '<span></span>';
    let emailInfo= '<span></span>';

    if(email !== ''){
      emailInfo= `<span> at:<br/> email: <b>${email}</b></span>`;
    }
    if(phone !== ''){
      if(email !== ''){
        phoneInfo = `<span><br/> phone: <b>${phone}</b></span>`
      } else {
        phoneInfo = `<span> at:<br/> phone: <b>${phone}</b></span>`
      }
    }
    if(moreInfo !== ''){
      moreInfoMessage=`<div>The following message has been provided as additional
      information: <br/><b>${moreInfo}</b></div>`;
    }
    if(email !== `` || phone !== ''){
      contactInfo = `<div>For further information, please contact <b>${name}</b>${emailInfo}${phoneInfo}</div>`
    }

    let message = {
      to:`Utilities Responder <hermano360@gmail.com>`,
      subject:`New Report - ${reportType} - ${level}`,
      text:``,
      html:`<p>Hello</p>
      <div>There has been a <b>${reportType}</b> reported at approximately ${formattedAddress}</div>
      <div>The incident happened on <b>${date}</b> with severity level: <b>${level}</b></div>
      ${contactInfo}
      ${moreInfoMessage}
        <br/>
        <div>Regards,</div>
        <div>AquaData</div>`,

    };

    console.log('Sending Mail');
    transporter.sendMail(message, (error,info)=>{
      if(error){
        console.log(error.message);
        return;
      }
      console.log("message sent successfully!");
      transporter.close();
    })

  }



}
