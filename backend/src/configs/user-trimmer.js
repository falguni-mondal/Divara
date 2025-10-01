const userDataTrimmer = (user) => {
    return {id: user._id, email: user.email, name: user.name, isVerified: user.isVerified}
}

export default userDataTrimmer;