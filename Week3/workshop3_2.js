function calculateBMI(weight, height) {
    const bmiValue = weight / (height * height);
    const bmiFixed = bmiValue.toFixed(2);

    let category = "";
    if (bmiValue < 18.5) {
        category = "ผอม";
    }else if (bmiValue >= 18.5 && bmiValue < 25){
        category = "ปกติ";
    }else if (bmiValue >= 25 && bmiValue < 30){
        category = "อ้วน";
    }else if (bmiValue >= 30){
        category = "อ้วนมาก";
    }
    return {
        bmi: bmiFixed,
        category: category
    };
}

console.log(calculateBMI(70, 1.75));
console.log(calculateBMI(50, 1.60));
console.log(calculateBMI(90, 1.70));