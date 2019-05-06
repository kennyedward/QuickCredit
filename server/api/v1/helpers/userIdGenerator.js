const userIdGenerator = () => Math.random().toPrecision(20).substr(2, 5);

export default userIdGenerator;
