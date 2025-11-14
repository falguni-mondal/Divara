const userDataTrimmer = (user) => {
    const {_id, email, name, firstname, lastname, isVerified, profileImage, profileBackground, role, address} = user;
    return { id: _id, email, name, isVerified, firstname, lastname, profileImage, profileBackground, role, address}
}

export default userDataTrimmer;