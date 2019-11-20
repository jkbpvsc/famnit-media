const Router = require('express').Router
const router = Router()
const sendMail = require('../helpers/send_email')
const uuidv4 = require('uuid/v4')
const queryDB = require('../helpers/database_query').queryDatabase
const insertIntoDB = require('../helpers/database_query').insertIntoDatabase

router.post('/example', async (req, res, next) => {
    if (req.body == undefined) {
        res.status(404).json({
            status: 404,
            message: 'missing body',
        })
        return
    }

    const google_email = req.body.google_email
    const famnit_email = req.body.famnit_email

    if (famnit_email == undefined || google_email == undefined) {
        res.status(404).json({
            status: 404,
            err_code: 'EMAIL_MISSING',
            message: 'you need to provide famnit_email and google_email',
        })
        return
    }
    
    if (!(validateEmail(famnit_email) && validateEmail(google_email))) {
        res.status(404).json({
            status: 404,
            err_code: 'EMAIL_IS_NOT_IN_CORRECT_FORMAT',
            message: 'Email provided is not in correct format',
        })
        return
    }

  // check for famnit email domain
  const domain = famnit_email.split('@')[1];

  if (domain !== 'student.upr.si') {
    res.status(404).json({
        status: 404,
        err_code: 'INCORRECT_FAMNIT_DOMAIN',
        message: 'famnit_email domain should be student.upr.si ',
    })
    return
  }

const responsegmailRecord = await queryDB(`SELECT * from user_authentication WHERE google_email = '${google_email}'`)

if(responsegmailRecord.length > 0 && responsegmailRecord[0].activated == 1) {
    res.status(404).json({
        status: 404,
        err_code: 'GOOGLE_ACOUNT_ALREADY_ACTIVATED',
        message: 'User with that google account is already activated',
    })
    return
}


  // check if only one famnit email is in db
  let famnitEmailAlreadyInDB = `SELECT * from user_authentication WHERE famnit_email = '${famnit_email}'`;

  const responseRowsFamnit = await queryDB(famnitEmailAlreadyInDB)
  const alreadyEmailRecord = responseRowsFamnit.length > 0;


if (alreadyEmailRecord && responseRowsFamnit.length > 0) {

    if(responseRowsFamnit[0].activated == 0) {
        await sendMail(famnit_email, 'Email verification', `Click on the following link to verify your account http://famnit-connect.herokuapp.com/register/famnit-email-verify/${responseRowsFamnit[0].verification_url_uuid}`);
        res.status(200).json({
            status: 200,
            message: 'EMAIL_RESEND'
        })
        return
    }
    res.status(404).json({
        status: 404,
        err_code: 'ACCOUTNT_ALREADY_EXISTS',
        message: 'User with that famnit_email is already in the database and verified',
    })
    return
}

const verification_url_uuid = uuidv4();
const currentDate = new Date();
let expires_at;
if (currentDate.getMonth() > 8) {
    expires_at = new Date((currentDate.getFullYear() + 1), 9, 1, 0, 0, 0, 0)
} else {
    expires_at = new Date(currentDate.getFullYear(), 9, 1, 0, 0, 0, 0)
}
const updated_at = new Date()
if(responsegmailRecord.length > 0) {
    await queryDB(`UPDATE user_authentication SET expires_at = ${db.escape(expires_at)}, updated_at = ${db.escape(updated_at)}, verification_url_uuid = '${verification_url_uuid}', famnit_email = '${famnit_email}' WHERE google_email = '${google_email}'`)
    await sendMail(famnit_email, 'Email verification', `Click on the following link to verify your account http://famnit-connect.herokuapp.com/register/famnit-email-verify/${verification_url_uuid}`);

    res.status(200).json({
        status: 200,
    })
    return
}


  const data = {
    uuid: uuidv4(),
    verification_url_uuid,
    google_email,
    famnit_email,
    created_at: new Date(),
    updated_at: new Date(),
    expires_at: expires_at,
  }


  let query = `INSERT INTO user_authentication SET ?`

try {
    await insertIntoDB(query, data)
} catch (e) {
    res.status(500).json({
        status: 500,
        err_code: 'ERR_INSERTING_RECORD'
    })
    return
}

try {
    await sendMail(famnit_email, 'Email verification', `Click on the following link to verify your account http://famnit-connect.herokuapp.com/register/famnit-email-verify/${verification_url_uuid}`);
} catch(err) {
    res.status(500).json({
        status: 500,
        err_code: 'INTERNAL_SERVER_ERROR',
        error: err,
    })
    return
}
    

  res.status(200).json({
      status: 200,
  })
})

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = router