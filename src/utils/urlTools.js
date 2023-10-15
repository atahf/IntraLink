const herokuURL = 'https://intralinkk-4f8233098a40.herokuapp.com';

export const getLoginURL = () => {
    return herokuURL + '/login';
};

export const getResetURL = () => {
    return herokuURL + '/general/reset-password';
};

export const getUserDataURL = (username) => {
    return herokuURL + '/api/v1/user/' + username;
};

export const getNewUserURL = () => {
    return herokuURL + '/api/v1/user/new-user';
};

export const getAllUsersDataURL = () => {
    return herokuURL + '/api/v1/user/all';
};

export const getAllUsersPublicDataURL = () => {
    return herokuURL + '/api/v1/user/all-public';
};

export const getChangePassURL = () => {
    return herokuURL + '/api/v1/user/change-password';
};

export const getEditUserURL = () => {
    return herokuURL + '/api/v1/user/edit-user';
};

export const getAllTicketsDataURL = () => {
    return herokuURL + '/api/v1/ticket/all';
};

export const getSubmissionTicketsURL = () => {
    return herokuURL + '/api/v1/ticket/submit';
};

export const getHandleTicketURL = () => {
    return herokuURL + '/api/v1/ticket/handle';
};

export const getRemoveTicketURL = () => {
    return herokuURL + '/api/v1/ticket/remove';
};

export const getMyMessagesURL = () => {
    return herokuURL + "/api/v1/message/receive";
};

export const getSendMessageURL = () => {
    return herokuURL + "/api/v1/message/send";
};

export const getFileAddURL = () => {
    return herokuURL + "/api/v1/file/upload";
};

export const getPPAddURL = () => {
    return herokuURL + "/api/v1/file/add-profile-picture";
};

export const getFileURL = (fileId) => {
    return herokuURL + "/api/v1/file/" + fileId;
};

export const getAllFileInfosURL = () => {
    return herokuURL + "/api/v1/file/all";
};

export const getFileShareURL = (fileId) => {
    return herokuURL + "/api/v1/file/share/" + fileId;
};

export const getFileUnshareURL = (fileId) => {
    return herokuURL + "/api/v1/file/unshare/" + fileId;
};

export const getFileDeleteURL = () => {
    return herokuURL + "/api/v1/file/delete";
};

export const getAllLogsURL = () => {
    return herokuURL + "/api/v1/log/all";
};
