const userDataTrimmer = (user) => {
    const {_id, email, name, firstname, lastname, isVerified, } = user;
    return { id: _id, email, name, isVerified, firstname, lastname, }
}

export default userDataTrimmer;