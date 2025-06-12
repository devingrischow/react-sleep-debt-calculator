import "./App.css";
import { useState } from 'react'


function App() {
  //in the highest section of this app, exsists the states to use for activation, adding, and calculations. 
  

  //Controls the amount of days to show, and how many hours to show 
  //Num = length of array
  const [showDayAmount, setShowDayAmount] = useState(2);
  const [isHoveringOnLast, setHoveringState] = useState(false);


  const [optimalHoursSleep, setOptimalSleepHours] = useState(0);



  //State to store the total hours of sleep debt 
  const [totalSleepDebt, setTotalSleepDebt] = useState(0);



  //2 Starting Values to show
  const [day1Hours, setDay1Hours] = useState(0);
  const [day2Hours, setDay2Hours] = useState(0);
  
  //Remaining week days hours
  const [day3Hours, setDay3Hours] = useState(0);
  const [day4Hours, setDay4Hours] = useState(0);
  const [day5Hours, setDay5Hours] = useState(0);
  const [day6Hours, setDay6Hours] = useState(0);
  const [day7Hours, setDay7Hours] = useState(0);


  //make an array coimbining all the hours, for easier access and using 
  const allHours = [
    day1Hours,
    day2Hours,
    day3Hours,
    day4Hours,
    day5Hours,
    day6Hours,
    day7Hours
  ];

  //Also use an array of all the set day hours functions, for the same reasons 
  const allSetHoursFunctions = [
    setDay1Hours,
    setDay2Hours,
    setDay3Hours,
    setDay4Hours,
    setDay5Hours,
    setDay6Hours,
    setDay7Hours
  ];


  
  //Use a Const to handle the function on click call 
  const handleAddAnotherDay = (setShowDayAmount, showDayAmount) => {
    IncreaseDayAmount(setShowDayAmount, showDayAmount);
  }

  const handleRemoveLastDay = (setShowDayAmount, showDayAmount) => {
    DecreaseDayAmount(setShowDayAmount, showDayAmount);

    //set is hovering to false 
    setHoveringState(false);
  }


  //A State is used to show how many days are added together to the total sleep debt 
  const [sleepDebtDays, setSleepDebtDays] = useState(0);

  //Handle on click of the calculate total button 
  //Needs to handle if theres not enough values (at least 2 needed)
  //or anything else that might cause issues 
  const handlePressCalculateSleepDebtButton = () => {

    var errorAlertMessage = "";

    var sleepDebtCheckingValue = 0;

    //no parameters needed, as it uses the states directly 

    setSleepDebtDays(0);
    
    
    
    //valid values has to reach 2 to be valid, meaning theres enough values to calculate 
    for (let hoursIndex = 0; hoursIndex < allHours.length; hoursIndex++) {
      if (allHours[hoursIndex] > 0) {
        sleepDebtCheckingValue += 1;
      }
    }
    setSleepDebtDays(sleepDebtCheckingValue);



    


    if (sleepDebtCheckingValue <= 1) {
      return alert("Please enter at least 2 days of sleep data to calculate sleep debt.");
    }

    //Once Passed, Ensure there is a valid optimal hours sleep value
    if (optimalHoursSleep <= 0) {
      return alert("Please enter a valid optimal hours of sleep value.");
    }

    //After Passing those 2 checks, sleep debt can be calculated 
    const calculatedSleepDebt = calculateSleepDebt(optimalHoursSleep, allHours, showDayAmount);

    //Set the total sleep debt state to the calculated value
    setTotalSleepDebt(calculatedSleepDebt);



  }

  
  return (
    <div className="App">
    
    
    
    
    <header className="App-header">
    <h1>Sleep Debt Calculator</h1>
    </header>
    
    
    
    
    <div className="Sleep-Row-Container">
    
    
    
      <div className="SleepEntryContainers">
      
      
      
      
      
        
        
        
    
        
        
        {/* 
          after day 2,
          If the Previous Days hours is greater than 0, then show the next days input, 
          Repeat this for the renaububg days        
          Using a for loop make the items appear 
          
          TODO: CHANGE INTO BUTTON PRESS TO ADD MORE DAYS (2 buttons for add days subtract days, and display )
          */
        }

        { 
          Array.from({ length: showDayAmount }, (_, index) => {
            
            const dayHourValue = allHours[index];
            const setDayHoursValue = allSetHoursFunctions[index];
            console.log(`Index: ${index}, Day Hour Value: ${dayHourValue}, Set Day Hours Value: ${setDayHoursValue}`);
            
            return SleepInput(index, dayHourValue, setDayHoursValue, showDayAmount, setHoveringState, isHoveringOnLast,  setShowDayAmount, handleRemoveLastDay);
            

            

          })
        }



        
      


        {/* Button Controlling Add Another Day*/}
        <button  onClick={() => handleAddAnotherDay(setShowDayAmount, showDayAmount) }  >+</button>
      
      
      
      
      
      
      
      
      
      
      </div>
      
      
      
      <div className="SleepDetailsContainer">
          
        <p>For the Following Days you slept: </p>
      
        {
          //This Block Handles whether or not to show the sleep details sections, and what they look like.

          //It uses the same method as the input does, based off increment value.

          Array.from({ length: showDayAmount }, (_, index) => {
            
            const dayHourValue = allHours[index];
            console.log(`Index: ${index}, Day Hour Value: ${dayHourValue}`);
            
            return howManyHoursSleptDetail(index + 1, dayHourValue);             
            

            

          })
        }



        {/* Use a Entry Above the button to handle inputs for best hours of sleep */}

        <label className="Optimal-Sleep-Input-Label">How many hours of sleep is the optimal amount for you?</label>
        <input
          className="OptimalSleepInput"
          type="number"
          name={`optimal-hours-sleep-input`}
          value={optimalHoursSleep}
          onChange={newNum => setOptimalSleepHours(newNum.target.value)}
        />


        <button 
          id="calculate-debt-button"

          onClick={handlePressCalculateSleepDebtButton}
        >
            
            Calculate Sleep Debt
            
        </button>



        {/* Sleep Debt Total label */

          SleepDebtTotalLabel(totalSleepDebt, showDayAmount)
        
        }
       





      </div>
      
      
      
      
    
    
    </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    </div>
  );
}



//Sleep debt total Label component 
//Stylized holder for the total sleep debt, and showcasing it 
function SleepDebtTotalLabel(sleepDebtTotal, daysCounted){
  //If the sleeb debt total is 0, then return null and dont do anything 
  //but if its not 0, then retun the stylized label 


  if (sleepDebtTotal !== 0){




    return (
      <div className="Sleep-Debt-Total-Label">
        <h2>Total Sleep Debt for {daysCounted} Days:</h2>
        <p>{sleepDebtTotal * -1} Hours of Sleep Debt</p>
      </div>
    )





  }


}



//Component for controlling how to assign and create the input items for the sleep inputs 
function SleepInput(dayNum, hoursSlept, setHoursSlept, showDayValue, setHoveringState, isHoveringState, setShowDayAmount, handleRemoveLastDay) {
  console.log(`SleepInput called with dayNum: ${dayNum}, hoursSlept: ${hoursSlept}, setHoursSlept: ${setHoursSlept}, showDayValue: ${showDayValue}`);

  var isLastItem = dayNum == showDayValue - 1 && dayNum > 1;
  console.log(`Is Last Item: ${isLastItem}`);




  //Use a state to control the hover effect state, and when to show the delete button

  //Conditional Class to use 
  var isLastID = isLastItem ? "Last-Day" : "Normal";






  return (



    //Only the Last available item should show the hover delete effect.
    //So only the last item can be deleted at a time. 
    <div 
      className="Sleep-Input-Container"


      id={isLastID}

      onMouseEnter={ () => { isLastItem ? setHoveringState(true) : setHoveringState(false) }  }
      onMouseLeave={ () => { isLastItem ? setHoveringState(false) : setHoveringState(false) } }

      // onMouseEnter={ () => isLastID ? setIsHovering(true)  : setIsHovering(false) }
      // onMouseLeave={ () => isLastID ? setIsHovering(false) : setIsHovering(false) }

    >
      <p>Day: {dayNum + 1}</p>

      <input
        className="HoursInput"
        type="number"
        name={`day-${dayNum}-input`}
        id={`sleep-day-${dayNum}-input`}
        value={hoursSlept}
        onChange={newNum => setHoursSlept(newNum.target.value)}
      />

      {
        /* Only show the delete button if it is the last item, being hovered over */

        isHoveringState == true && isLastItem == true && ( 
          <button className="deleteCell" onClick={() => handleRemoveLastDay(setShowDayAmount, showDayValue)}>X</button>
        )

      }


    </div>
    
  );
}


function IncreaseDayAmount(setDay, dayValue){
  //Function to increase the amount of days shown, and add a new input for the next day
  console.log("Curr set day value: ", setDay)
  console.log("Curr day value: ", dayValue)


  //Prevent from going above 7 days
  if(dayValue >= 7) {
    console.log("Cannot add more than 7 days");
    return;
  }

  //Increase the amount of days shown
  setDay(dayValue + 1);
  

  
}

function DecreaseDayAmount(setDay, dayValue){
  //Function to increase the amount of days shown, and add a new input for the next day

  //actually dont do it below 2, because it activates after 2
  if(dayValue === 2) {
    console.log("Cannot remove days below 0");
    return;
  }


  setDay(dayValue - 1);

  
}


//Component for showing what day it is, and how many hours were slept.
function howManyHoursSleptDetail(dayNum, hoursSlept) {
  
  return (
    <div className="Sleep-Day-Hour-Details">
    <p>Day {dayNum}: </p>  
    
    <p>{hoursSlept} Hours</p>
    </div>
  );
  
}



//Takes the required values and calculates the users sleep debt based on their inputted values
//Optimal Hours: The Optimal Hours the user needs to sleep
function calculateSleepDebt(optimalHours, hoursSleptArray, daysToCount){
  console.log("Calculating Sleep Debt with Optimal Hours: ", optimalHours, " and ", daysToCount, " days to count.", " Searching through hours slept array: ", hoursSleptArray); 
  var totalSleepDebt = 0;

  var combindSleepHours = 0;
  //loop through the count of days to count, 
  //for each count reference the hours slept arrray, and keep a running total of the sleep amount
  for(let dayIndex = 0; dayIndex < daysToCount; dayIndex++) {
    const hoursSlept = hoursSleptArray[dayIndex];

    combindSleepHours += parseFloat(hoursSlept);

  }



  console.log(`Combined Sleep Hours: ${combindSleepHours}`);

  //Take the users optimal sleep and multiply by the amount of days being calculated
  var step3Calculation = optimalHours * daysToCount;

  //sleep debt is calculated by taking the total sleep combined - the previous calculation
  totalSleepDebt = combindSleepHours - step3Calculation;

  console.log(`Total Sleep Debt: ${totalSleepDebt}`);

  return totalSleepDebt;


}





export default App;
