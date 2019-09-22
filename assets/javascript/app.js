// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBUyu-zZoOvbTcnCvqt1N0mKz5x7QfO0kI",
    authDomain: "testing-96af5.firebaseapp.com",
    databaseURL: "https://testing-96af5.firebaseio.com",
    projectId: "testing-96af5",
    storageBucket: "",
    messagingSenderId: "586493252002",
    appId: "1:586493252002:web:c8cc0b06775b796f9a22fb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $("#submit-btn").on("click", function(){
    event.preventDefault();
    // grabs all data from input fields 
      var trainName = $("#train-name").val().trim();
      var destin = $("#destination").val().trim();
      var firstTrain = $("#time").val().trim();
      var freq = $("#frequency").val().trim();

    // store all data in the object 
        var trainInfo = { 
            name: trainName, 
            destination: destin,
            start: firstTrain,
            frequency: freq,
        }
    
    database.ref().push(trainInfo) // function to push (upload) info to database
    
    // log everythign to the console 
    console.log(trainInfo.name);
    console.log(trainInfo.destination);
    console.log(trainInfo.start);
    console.log(trainInfo.frequency);


    $("#train-name").val("")
    $("#destination").val("")
    $("#time").val("")
    $("#frequency").val("")
});

database.ref().on("child_added", function(childSnapshot) {
    
    console.log(childSnapshot.val());
// 
    trName = childSnapshot.val().name;
    trDestin = childSnapshot.val().destination;
    trTime = childSnapshot.val().start;
    trFrequency = childSnapshot.val().frequency;
// 
    console.log(trName)
    console.log(trDestin)
    console.log(trTime)
    console.log(trFrequency)
// 

    var firstTimeConverted = moment(trTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted)
    
    var nowTime = moment();
    console.log(nowTime);
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(diffTime);
    var tRemainder = diffTime % trFrequency;
    console.log(tRemainder);
    var minutesAway = trFrequency - tRemainder;
    var nextTrain = moment().add(minutesAway, "minutes");
    var nextArrival = moment(nextTrain).format("HH:mm");

    console.log(nextArrival);
    console.log(minutesAway);


    var newRow = $("<tr>").append(
        $("<td>").text(trName),
        $("<td>").text(trDestin),
        $("<td>").text(trFrequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
    );
        
    $("#train-table > tbody").append(newRow);

    


// 
// 
});




