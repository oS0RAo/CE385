const fetchDataWithCallback = (callback) => {
    setTimeout(() => {
        callback("Success!!!");
    }, 2000);
}
fetchDataWithCallback((message) => {
    console.log("Callback Data:", message);
});

const fetchDataWithPromise = () => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            const success = true;

            if(success){
                resolve("Success!!!")
            } else {
                reject("Fail")
            }
        }, 2000);
    });
};
fetchDataWithPromise()
    .then((success) => {
        console.log("Data fetch:", success);
    })
    .catch((error) => {
        console.error("Error!!!:", error)
    })