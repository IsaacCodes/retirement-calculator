var savings;
var contribution;
var c_age;
var r_age;
var aroi;
var lifespan;
var arir;
var expenses;
var total1;

var first_creation = true;
var x_values = [];
var y_values = [];

function DataSave() {
  savings = parseInt(document.getElementById("savings").value);
  contribution = parseInt(document.getElementById("contribution").value);
  c_age = parseInt(document.getElementById("c_age").value);
  r_age = parseInt(document.getElementById("r_age").value);
  aroi = parseFloat(document.getElementById("aroi").value);

  if (c_age < 0 || c_age > 100 || r_age < 0 ||r_age > 200) {    
    document.getElementById("total1").innerHTML = "&#9746; Current Age must be from 0-100, Retirement Age must be from 0-200."
    document.head.insertAdjacentHTML("beforeend", `<style>p.total1{color:red}</style>`);
    return;
  }
  else {
    var intrest1 = savings * (1 + aroi/100)**(r_age-c_age);
    var contributions1 = contribution * (((1 + aroi/100)**(r_age-c_age) - 1) / (aroi/100)) * (1 + aroi/100);
  }


  total1 = Math.round(intrest1 + contributions1);

  number_format = new Intl.NumberFormat('en-US');
  str_total1 = "$" + number_format.format(total1);

  if (str_total1 == "$NaN") {
    document.getElementById("total1").innerHTML = "&#9746; Please fill in all inputs, Annual Return on Investment cannot be 0.";
    document.head.insertAdjacentHTML("beforeend", `<style>p.total1{color:red}</style>`);
  }
  else if (r_age > c_age) {
    document.getElementById("total1").innerHTML = `You will have <b>${str_total1}</b> saved by the time you retire.`;
    document.head.insertAdjacentHTML("beforeend", `<style>p.total1{color:black}</style>`);
  } 
  else {
    document.getElementById("total1").innerHTML = "&#9746; Retirement Age must be greater than Current Age.";
    document.head.insertAdjacentHTML("beforeend", `<style>p.total1{color:red}</style>`);
  }



  lifespan = parseInt(document.getElementById("lifespan").value);
  arir = parseFloat(document.getElementById("arir").value);
  expenses = parseInt(document.getElementById("expenses").value);

  if (lifespan < 0 || lifespan > 300) {    
    document.getElementById("total2").innerHTML = "&#9746; Lifespan must be from 0-300."
    document.head.insertAdjacentHTML("beforeend", `<style>p.total2{color:red}</style>`);
    return;
  }
  else {
    var intrest2 = total1 * (1 + arir/100)**(lifespan-r_age);
    var contributions2 = (expenses * -12) * (((1 + arir/100)**(lifespan-r_age) - 1) / (arir/100)) * (1 + arir/100);
  }

  var debt2 = false;
  var total2 = Math.round(intrest2 + contributions2);
  if (total2 < 0){
    debt2 = true;
    total2 = total2 * -1;
  }

  str_total2 = "$" + number_format.format(total2);


  if (str_total2 == "$NaN") {
    document.getElementById("total2").innerHTML = "&#9746; Please fill in all inputs, Annual Return in Retirement cannot be 0.";
    document.head.insertAdjacentHTML("beforeend", `<style>p.total2{color:red}</style>`);
  }
  else if (lifespan > r_age) {
    if (debt2 == false) {
    document.getElementById("total2").innerHTML = `Your children will inherit <b>${str_total2}</b>. Lucky them!`;
    document.head.insertAdjacentHTML("beforeend", `<style>p.total2{color:black}</style>`);
    }
    
    else {
      document.getElementById("total2").innerHTML = `You will need <b>${str_total2} more</b> or else you will go broke.`;
      document.head.insertAdjacentHTML("beforeend", `<style>p.total2{color:black}</style>`);
    }
  } 
  else {
    document.getElementById("total2").innerHTML = "&#9746; Lifespan must be greater than Retirement Age.";
    document.head.insertAdjacentHTML("beforeend", `<style>p.total2{color:red}</style>`);
  }
  if (first_creation == false) {
    graph(myGraph);
  }
  else {
    first_creation = false
  }
}


function graph(chart) {
  var x_values = [];
  for (let i = 0; i <= lifespan - c_age; i++) {
    var new_value = c_age + i;
    x_values.push(new_value);
  }


  y_values = [];
  for (let i = 0; i <= r_age - c_age; i++) {
    var g_intrest1 = savings * (1 + aroi/100)**(i);
    var g_contributions1 = contribution * (((1 + aroi/100)**(i) - 1) / (aroi/100)) * (1 + aroi/100);
    var g_total1 = Math.round(g_intrest1 + g_contributions1);
    y_values.push(g_total1);
  }

  for (let i = 1; i <= lifespan - r_age; i++) {
    var g_intrest2 = total1 * (1 + arir/100)**(i);
    var g_contributions2 = (expenses * -12) * (((1 + arir/100)**(i) - 1) / (arir/100)) * (1 + arir/100);
    var g_total2 = Math.round(g_intrest2 + g_contributions2);
    y_values.push(g_total2);
  }



  chart.data.datasets[0].data = y_values; 
  chart.data.labels = x_values;
  chart.update("resize");
}
