
const asyncHandler = require('express-async-handler')
const { generatePasswordHash } = require('../utils/password')
const User = require('../models/user')

const create = asyncHandler(async (req, res) => {
    const { lastName, firstName, email, password } = req.body;

    if (!lastName)
        throw new Error('Campul lastName lipseste din corpul cererii!');

    if (!firstName)
        throw new Error('Campul firstName lipseste din corpul cererii!');

    if (!email)
        throw new Error('Campul email lipseste din corpul cererii!');

    if (!password)
        throw new Error('Campul password lipseste din corpul cererii!');

    const user = await User.findOne({ email });

    if (user)
        throw new Error('Email-ul este deja folosit de alt utilizator!');
  
    const hashedPassword = await generatePasswordHash(password);

    const newUser = new User({lastName, firstName, email, password: hashedPassword });

    await newUser.save();

    res.json({message: `Utilizatorul ${lastName} ${firstName} a fost creat cu succes!`})
})

const getAll = asyncHandler(async (_req, res) => {
    res.json(await User.find({}, { __v: 0 }));
})

const updateById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { lastName, firstName } = req.body;

    const user = await User.findById(id);

    if (!user) {
        throw new NoEntityFoundException(`Nu exista niciun utilizator cu ID-ul ${id}!`);
    }

    user.lastName = lastName;
    user.firstName = firstName;

    await user.save();

    res.json(
        {
            message: 'Datele tale au fost actualizate cu succes!',
            severity: 'success',
            user: {
                id: user.id,
                lastName: user.lastName,
                firstName: user.firstName,
                email: user.email,
                avatarUri: user.avatarUri
            }
        }
    );
})

const deleteById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const user = await User.findById(id);
    if (user) {
        res.json({ message: `User with id ${id} was deleted successfully!` });
    }
    else {
        res.status(404);
        res.json({ message: `There is no user with id ${id}!` })
    }
})

const deleteAll = asyncHandler(async (_req, res) => {
    const { deletedCount } = await User.deleteMany({});
    res.json({ message: `All (${deletedCount}) users were deleted successfully!` });
})

module.exports = { create, getAll, updateById, deleteById, deleteAll }