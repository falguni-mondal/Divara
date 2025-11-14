export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

export const randomDP = () => {
    const dp = [
        "https://ik.imagekit.io/testappFalguni/Divara/display-background/1.webp?updatedAt=1761897087247",
        "https://ik.imagekit.io/testappFalguni/Divara/display-background/2.webp?updatedAt=1761897087314",
        "https://ik.imagekit.io/testappFalguni/Divara/display-background/3.webp?updatedAt=1761897087361",
        "https://ik.imagekit.io/testappFalguni/Divara/display-background/4.webp?updatedAt=1761897087275",
        "https://ik.imagekit.io/testappFalguni/Divara/display-background/5.webp?updatedAt=1761897086540",
        "https://ik.imagekit.io/testappFalguni/Divara/display-background/6.webp?updatedAt=1761897085578",
        "https://ik.imagekit.io/testappFalguni/Divara/display-background/7.webp?updatedAt=1761897084959",
    ]

    const randomIndex = Math.floor(Math.random() * dp.length);
    return dp[randomIndex];
}