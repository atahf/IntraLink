const herokuURL = 'https://intralinkk-4f8233098a40.herokuapp.com';

export const getLoginURL = () => {
    return herokuURL + '/login';
};

export const getReesetURL = () => {
    return herokuURL + '/reset';
};

export const getUserDataURL = (username) => {
    return herokuURL + '/api/v1/user/' + username;
};

export const getNewUserURL = () => {
    return herokuURL + '/api/v1/user/new-user';
};

export const getAllTicketsDataURL = () => {
    return herokuURL + '/api/v1/ticket/all';
};

export const getSubmissionTicketsURL = () => {
    return herokuURL + '/api/v1/ticket/submit';
};

export const getUploadURL = () => {
    return herokuURL + '/upload';
};

export const getDownloadURL = (fileName) => {
    return herokuURL + '/download/' + fileName;
};
