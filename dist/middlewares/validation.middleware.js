"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddelware = void 0;
exports.validationMiddelware = (req, res, next) => {
    const { filename, width, height } = req.query;
    if (height === '') {
        res.json({ message: 'You must enter height!' });
    }
    else if (filename === '') {
        res.json({ message: 'You must enter filename!' });
    }
    else if (width === '') {
        res.json({ message: 'You must enter width!' });
    }
    else {
        next();
    }
};
// if(filename !=='string')
// {
//   res.json({message:'filename must be string!'})
// }
// else if(
// )
// };
// the movie talk about suffring to achive the goal and satisfiction
//
// ant the suffring when any person have a dream
