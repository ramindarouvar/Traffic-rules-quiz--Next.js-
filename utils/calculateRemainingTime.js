export const calculateRemainingTime = (endTime) => {
    var now = Date.now();
    var remainingTime = endTime - now;
    var minutes = Math.floor(remainingTime / (1000 * 60));
    var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
  
    var remainingTimeString = `${minutes}:${seconds}`;
    
    if (remainingTime < 0) {
      // If there is no time left to respond
      remainingTimeString = 'پایان زمان آزمون'
    }

    return remainingTimeString;
};
