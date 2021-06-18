function SelectRedirect() {
    const empname = document.getElementById('employee-dropdown').value
    if (typeof (Storage) !== "undefined") {
       //store emp name
       localStorage.setItem("empname", empname);
       console.log(localStorage.getItem("empname"))
    } else {
       //send to html page that says they need to use a browser with local storage support
    }
    // ON selection of section this function will work
    //alert( document.getElementById('s1').value);

    switch (document.getElementById('employee-dropdown').value) {
       case "Will":
          window.location = "../manager";
          break;

       case "Rick":
          Header.innerText = "Prepare Yourself..."
          
          setTimeout(() => { window.location = "https://youtu.be/dQw4w9WgXcQ";},1000)

        
          break;
       /// Can be extended to other different selections of SubCategory //////
       default:
          window.location = "../empHome"; // if the manager isn't selected, go to the employee home page with the selected name queried. 
          break;
    }// end of switch 
 }
 let dropdown = document.getElementById('employee-dropdown');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose employee';
    defaultOption.disabled = true;
    defaultOption.selected = true;

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
    const url = 'https://ersnode.herokuapp.com/employeeList';

    const request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function () {
       if (request.status === 200) {
          const data = JSON.parse(request.responseText);
          let option;
          for (let i = 0; i < data.length; i++) {
             option = document.createElement('option');
             option.id = data[i].name;
             option.text = data[i].name;
             option.value = data[i].name;
             dropdown.add(option);
          }
       } else {
          // Reached the server, but it returned an error
       }
    }

    request.onerror = function () {
       console.error('An error occurred fetching the JSON from ' + url);
    };

    request.send();