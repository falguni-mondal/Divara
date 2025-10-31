const userDataTrimmer = (user) => {
    const {_id, email, name, firstname, lastname, isVerified, profileImage} = user;
    return { id: _id, email, name, isVerified, firstname, lastname, profileImage}
}

export default userDataTrimmer;