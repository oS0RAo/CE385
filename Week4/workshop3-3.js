const simulateAsyncOperation = (timeout) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (timeout < 1000) {
                reject(`Error: Timeout ${timeout}ms`);
            } else {
                resolve(`Success: Operation finished in ${timeout}ms`);
            }
        }, timeout);
    });
};

const performAsyncTask = async (time) => {
    try {
        console.log(`Starting task with ${time}ms`);
        const result = await simulateAsyncOperation(time);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
};

performAsyncTask(1500);
performAsyncTask(500);