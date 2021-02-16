window.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above
    
    var form = document.getElementById("my-form");
    //var button = document.getElementById("my-form-button");
    var status = document.getElementById("status");

    // Success and Error functions for after the form is submitted
    
    function success() {
      form.reset();
      status.classList.add('success');
      status.innerHTML = "Thanks!";
    }

    function error() {
        status.classList.add('error');
      status.innerHTML = "Oops! There was a problem.";
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  });
  
  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }

document.querySelector("body").addEventListener('mousemove', eyeball);
        function eyeball() {
            var eye = document.querySelectorAll(".eye");
            eye.forEach(function (eye) {
                let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
                let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
                let radian = Math.atan2(event.pageX - x, event.pageY - y);
                let rot = (radian * (180 / Math.PI) * -1) + 270;
                eye.style.transform = "rotate(" + rot + "deg)";
            })
        }


function openFunction() {
    document.getElementById("menu").style.width="120px";
    document.getElementById("mainbox").style.marginRight="60px";
}


function closeFunction() {
    document.getElementById("menu").style.width="40px";
    document.getElementById("mainbox").style.marginRight="0px";
}

function copyUrl() {
    if (!window.getSelection) {
      alert('Please copy the URL from the location bar.');
      return;
    }
    const dummy = document.createElement('p');
    dummy.textContent = window.location.href;
    document.body.appendChild(dummy);
  
    const range = document.createRange();
    range.setStartBefore(dummy);
    range.setEndAfter(dummy);
  
    const selection = window.getSelection();
    // First clear, in case the user already selected some other text
    selection.removeAllRanges();
    selection.addRange(range);
  
    document.execCommand('copy');
    document.body.removeChild(dummy);
  }

const deg = 6;
const hr = document.querySelector('#hr');
const mn = document.querySelector('#mn');
const sc = document.querySelector('#sc');

setInterval (() => {
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;

    hr.style.transform = `rotateZ(${(hh) + (mm/12)}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`;
})

function insert(num) {
    document.form.textview.value = document.form.textview.value + num
}

function equal() {
    var exp = document.form.textview.value;
    if (exp) {
        document.form.textview.value = eval(exp);
    }
}

function clean() {
    document.form.textview.value = "";
}

function back(){
    var exp = document.form.textview.value;
    document.form.textview.value = exp.substring(0, exp.length - 1);
}

function todegrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}

function checkValidity(a, b, c) 
{ 
    if (a + b > c && a + c > b && b + c > a)
        return true;
    return false;
} 

function swap(a, b) {
    return [b, a]
  }  

function find() {
    var A = parseInt(document.getElementById("sideA_input").value);
    var B = parseInt(document.getElementById("sideB_input").value);
    var C = parseInt(document.getElementById("sideC_input").value);
    if (A && B && C) {
        if (checkValidity(A, B, C)) {
            var angleA = Math.acos((B * B + C * C - A * A) / (2 * B * C));
            var angleB = Math.acos((C * C + A * A - B * B) / (2 * C * A));
            var angleC = Math.acos((A * A + B * B - C * C) / (2 * A * B));
            document.getElementById("angleA_input").value = todegrees(angleA).toFixed(2);
            document.getElementById("angleB_input").value = todegrees(angleB).toFixed(2);
            document.getElementById("angleC_input").value = todegrees(angleC).toFixed(2);
            var triangletype = "";
            if (A > B) {
                [A, B] = swap(A, B);
            }
            if (B > C) {
                [B, C] = swap(B, C);
            }
            if (C * C < A * A + B * B)
                triangletype = "Acute-angled Triangle";
            else
                if (C * C == A * A + B * B)
                    triangletype = "Right-angled Triangle";
                else
                    triangletype = "Obtuse-angled Triangle";
            document.getElementById("triType_input").value = triangletype;
            var p = (A + B + C) / 2;
            var Area = p * (p - A) * (p - B) * (p - C);
            Area = Math.sqrt(Area);
            console.log(Area);
            document.getElementById("tryArea_input").value = Area.toFixed(2);
        }
        else
            alert("The sides you entered cannot form a triangle." +  "\n" + "Remember : A triangle is valid if sum of its two sides is greater than the third side.")
    }
    else 
        alert("You need to enter 3 sides!");
}

function reset() {
    document.getElementById("angleA_input").value = '';
    document.getElementById("angleB_input").value = '';
    document.getElementById("angleC_input").value = '';
    document.getElementById("sideA_input").value = '';
    document.getElementById("sideB_input").value = '';
    document.getElementById("sideC_input").value = '';
    document.getElementById("triType_input").value = '';
    document.getElementById("tryArea_input").value = '';
}