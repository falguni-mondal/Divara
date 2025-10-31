const userDataTrimmer = (user) => {
    const {_id, email, name, firstname, lastname, isVerified, profileImage, profileBackground} = user;
    return { id: _id, email, name, isVerified, firstname, lastname, profileImage, profileBackground}
}

export default userDataTrimmer;