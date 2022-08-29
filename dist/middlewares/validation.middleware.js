"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddelware = void 0;
exports.validationMiddelware = (req, res, next) => {
    if (req) {
        const { filename, width, height } = req.query;
        !filename ? res.json({ message: 'You must enter filename!' }) :
            !width ? res.json({ message: 'You must enter width!' })
                : !height ? res.json({ message: 'You must enter height!' }) : null;
        if (filename && width && height) {
            filename === 'number' ? res.json({ message: 'filename must be string!' })
                : width !== 'number' ? res.json({ message: 'width must be number!' })
                    : height !== 'number' ? res.json({ message: 'width must be number!' }) : null;
        }
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
