const randomIdGenerator = () => `QC-${Math.random().toPrecision(20).substr(2, 8)}`;

export default randomIdGenerator;
