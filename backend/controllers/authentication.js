const { generatePasswordHash, generateRandomPassword } = require('../utils/password');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler')
const User = require('../models/user');


const register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName)
        throw new Error('Campul firstName lipseste din corpul cererii!');

    if (!lastName)
        throw new Error('Campul lastName lipseste din corpul cererii!');

    if (!email)
        throw new Error('Campul email lipseste din corpul cererii!');

    if (!password)
        throw new Error('Campul password lipseste din corpul cererii!');

    const user = await User.findOne({ email });

    if (user)
        throw new Error('Email-ul este deja folosit de alt utilizator!');

    //const token = generateActivateToken(email)

    const hashedPassword = await generatePasswordHash(password);

    const newUser = new User({ firstName, lastName, email, password: hashedPassword});

    await newUser.save();

    res.json({ message: 'Te-ai inregistrat cu succes!', severity: 'info' });
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email)
        throw new Error('Campul email lipseste din corpul cererii!');

    if (!password)
        throw new Error('Campul password lipseste din corpul cererii!');

    const user = await User.findOne({ email });

    if (user) {
        if (!await bcrypt.compare(password, user.password))
            throw new Error('Parola incorecta')

        
        res.json({
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
            message: 'Te-ai autentificat cu success!',
            severity: 'success'
        })
    }
    else
        throw new Error(`Nu exista niciun utilizator cu email-ul ${email}!`);
})

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email)
        throw new MissingFieldException('Campul email lipseste din corpul cererii!');

    const user = await User.findOne({ email });

    if (!user)
        throw new NoEntityFoundException(`Nu exista niciun utilizator cu email-ul ${email}!`);

    const randomPassword = generateRandomPassword()

    const hashedPassword = await generatePasswordHash(randomPassword);

    user.password = hashedPassword;

    await user.save();

    res.json({ message: `Noua parola este ${randomPassword}`, severity: 'info' })
})

// const changeEmail = asyncHandler(async (req, res) => {
//     const { userId, newEmail } = req.body

//     if (!userId)
//         throw new MissingFieldException('Campul userId lipseste din corpul cererii!');

//     if (!newEmail)
//         throw new MissingFieldException('Campul newEmail lipseste din corpul cererii!');

//     const user = await User.findById(userId);

//     if (!user)
//         throw new NoEntityFoundException(`Nu exista niciun utilizator cu ID-ul ${userId}!`);

//     const newChangeEmail = new ChangeEmail({ userId: user._id, oldEmail: user.email, newEmail });

//     await newChangeEmail.save();

//     const token = generateChangeEmailToken(newChangeEmail.id);

//     console.log(`http://127.0.0.1:3000/confirm-change-email/${token}`);

//     res.json({ message: 'Un email a fost trimis continand link-ul de confirmare!', severity: 'info' });
// })

// const changePassword = asyncHandler(async (req, res) => {
//     const { userId, oldPassword, newPassword } = req.body

//     if (!userId)
//         throw new MissingFieldException('Campul userId lipseste din corpul cererii!');

//     if (!oldPassword)
//         throw new MissingFieldException('Campul oldPassword lipseste din corpul cererii!');

//     if (!newPassword)
//         throw new MissingFieldException('Campul newPassword lipseste din corpul cererii!');

//     const user = await User.findById(userId);

//     if (!user)
//         throw new NoEntityFoundException(`Nu exista niciun utilizator cu ID-ul ${userId}!`);

//     if (!await bcrypt.compare(oldPassword, user.password))
//         throw new UnauthorizedAccessException('Parola incorecta');

//     const hashedNewPassword = await generatePasswordHash(newPassword);

//     const newChangePassword = new ChangePassword({ userId: user._id, oldPassword: user.password, newPassword: hashedNewPassword });

//     await newChangePassword.save();

//     const token = generateChangePasswordToken(newChangePassword.id);

//     console.log(`http://127.0.0.1:3000/confirm-change-password/${token}`)

//     res.json({ message: 'Un email a fost trimis continand link-ul de confirmare!', severity: 'info' })
// })

// const confirmChangeEmail = asyncHandler(async (req, res) => {
//     const { token } = req.body;

//     if (!token)
//         throw new MissingFieldException('Campul token lipseste din corpul cererii!');

//     const { changeEmailId } = jwt.verify(token, process.env.JWT_CHANGE_EMAIL_TOKEN_SECRET as string) as JwtPayload;

//     const changeEmail = await ChangeEmail.findById(changeEmailId);

//     if (!changeEmail)
//         throw new NoEntityFoundException('Nu exista nicio cerere de schimbare de email cu acest ID!');

//     const user = await User.findById(changeEmail.userId);

//     if (!user)
//         throw new NoEntityFoundException('Nu exista niciun utilizator cu acest ID!');

//     user.email = changeEmail.newEmail;

//     await user.save();

//     res.json({ message: 'Email-ul a fost actualizat cu succes!', severity: 'success', newEmail: changeEmail.newEmail })
// })

// const confirmChangePassword = asyncHandler(async (req, res) => {
//     const { token } = req.body;

//     if (!token)
//         throw new MissingFieldException('Campul token lipseste din corpul cererii!');

//     const { changePasswordId } = jwt.verify(token, process.env.JWT_CHANGE_PASSWORD_TOKEN_SECRET as string) as JwtPayload;

//     const changePassword = await ChangePassword.findById(changePasswordId);

//     if (!changePassword)
//         throw new NoEntityFoundException('Nu exista nicio cerere de schimbare de parola cu acest ID!');

//     const user = await User.findById(changePassword.userId);

//     if (!user)
//         throw new NoEntityFoundException('Nu exista niciun utilizator cu acest ID!');

//     user.password = changePassword.newPassword;

//     await user.save();

//     res.json({ message: 'Parola a fost actualizata cu succes!', severity: 'success' })
// })

// const logout = asyncHandler(async (req, res) => {
//     const { accessToken } = req.cookies;
//     await UserToken.deleteOne({ token: accessToken });
//     res.clearCookie('accessToken');
//     res.json({ message: 'Ai iesit din aplicatie!', severity: 'success' });
// })

module.exports = { register, login, forgotPassword };