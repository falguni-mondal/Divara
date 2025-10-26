const userDataTrimmer = (user) => {
    return {id: user._id, email: user.email, name: user.name, isVerified: user.isVerified, firstname: user.firstname, lastname: user.lastname}
}

export default userDataTrimmer;