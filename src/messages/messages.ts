const Messages = (input) => {
  return {
    created: {
      error: false,
      status: 200,
      message: 'Successfully Created',
    },

    notFound: {
      error: true,
      status: 404,
      message: ` ${input} Not Found`,
    },

    invalidInput: {
      error: true,
      status: 404,
      message: ` Not Valid input, don't enter zero for width and height!`,
    },
    requiredInput: {
      error: true,
      status: 404,
      message: `you should add width and height they are Required `,
    },
    negativeValue: {
      error: true,
      status: 404,
      message: `width or height Cann't be negative! `,
    },
    somethingWentWrong: {
      error: true,
      status: 403,
      message: `Something Went Wrong `,
    },
  };
};

export default Messages;
