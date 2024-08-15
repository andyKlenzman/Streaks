// Grabs necessary information from firebase's returned user object. 


const parseUserInfo = ( userInfo ) => {
    const parsedUserInfo = {
        email: userInfo.email,
        displayName: userInfo.displayName,
        createdAt: userInfo.createdAt,
        uid: userInfo.uid
    };

    return parsedUserInfo;
};

export default parseUserInfo