const fetchDataFromServer1 = () => {
    return new Promise((resolve) => setTimeout(() => resolve('Server 1 (2s)'), 2000));
};

const fetchDataFromServer2 = () => {
    return new Promise((_, reject) => setTimeout(() => reject('Server 2 (1s)'), 1000));
};

const fetchDataFromServer3 = () => {
    return new Promise((resolve) => setTimeout(() => resolve('Server 3 (3s)'), 3000));
};

Promise.any([
    fetchDataFromServer1(),
    fetchDataFromServer2(),
    fetchDataFromServer3()
]).then((result) => {
    console.log("Case 1 Result:\n", result);
}).catch((err) => {
    console.error("All servers failed", err);
});

Promise.allSettled([
    fetchDataFromServer1(),
    fetchDataFromServer2(),
    fetchDataFromServer3()
]).then((results) => {
    console.log("Case 2 Results:");
    results.forEach((res, index) => {
        console.log(` Server ${index + 1}: Status = ${res.status}, Result = ${res.value || res.reason}`);
    });
});