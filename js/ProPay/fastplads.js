function validateForm() {
  var form_data = $("#signup_form").serializeArray();
  var filled = true;
  form_data.forEach(element => {
    var elements = document.forms["signup_form"][element.name];
    if (elements.hasAttribute("required")) {
      if (elements.value == "") {
        filled = false;
        elements.setAttribute("style", "border: 1px solid red;");
      } else {
        elements.setAttribute("style", "border: 1px solid #ccc;");
      }
    }
  });
  if (filled) {
    submitform();
  }
}
function submitform() {
  var data = $("#signup_form").serializeArray();
  var customer = Object.assign({}, ...data.map(item => ({ [item.name]: item.value, "generate_handle": true })));

  var config = {
    "plan": "plan-c648e",
    "signup_method": "link"
  }

  var finalData = {
    "plan": config.plan,
    "signup_method": config.signup_method,
    "generate_handle": true,
    "create_customer": customer
  }

  axios({
    method: 'post',
    url: 'https://europe-west1-republicdomain-dev.cloudfunctions.net/api',
    data: finalData,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  })
    .then(res => {
      if (res.status !== 200) {
        console.log(res.status + " " + res.statusText); // Todo synglig fejlhåndtering i frontend
      } else {
        window.location.href = "/success/"
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}