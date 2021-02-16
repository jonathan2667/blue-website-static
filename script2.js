var input = document.getElementById("input");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("myBtn").click();
  }
});


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
    return [b, a];
}  

function ClearCanvas() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw(AB, BC, AC) {
    // hardcoded, but you would get those from user
    
    var dist = 20;
    var A = [dist, dist]; // starting coordinates
    var B = [dist, AB];
    var C = [];

    // calculate third point
    C[1] = (AB * AB + AC * AC - BC * BC) / (2 * AB) + dist;
    C[0] = Math.sqrt(AC * AC - C[1] * C[1]) + dist;
    console.log(A, B, C);

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.fillStyle = "#98cbff";
    ctx.moveTo(A[0], A[1]);
    ctx.lineTo(B[0], B[1]);
    ctx.lineTo(C[0], C[1]);
    ctx.fill();
}

function find() {
    ClearCanvas();
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
            document.getElementById("tryArea_input").value = Area.toFixed(2);
            draw(A * 10, B * 10, C * 10);
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
    ClearCanvas();
}

function search() {
    var array = [0];
    var id = parseInt(document.getElementById("input").value);
    if (array.indexOf(id) >= 0 || id > 3800) {
        alert("Problema nu exista pe site sau inca nu este rezolvata!");
    }
    else {
        document.getElementById("atach").innerHTML = "<iframe id=\"atach1\" src=\"solutions/" + id + ".txt\" ></iframe>";
    }
}


function copySolution(){
    var id = parseInt(document.getElementById("input").value);
    var file = "solutions/" + id + ".txt";
    var str;



    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                str= rawFile.responseText; 
            }
        }
    }
    rawFile.send(null);
    console.log(str);

    const copy_to_Clipboard = str => {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        const selected =
          document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        if (selected) {
          document.getSelection().removeAllRanges();
          document.getSelection().addRange(selected);
        }
      };
      copy_to_Clipboard(str);
}

async function handleSubmit(event) {
    event.preventDefault();
    const inputValue = document.querySelector('.js-search-input').value;
    const searchQuery = inputValue.trim();
  
    const searchResults = document.querySelector('.js-search-results');
    searchResults.innerHTML = '';
  
    const spinner = document.querySelector('.js-spinner');
    spinner.classList.remove('hidden');
  
    try {
      const results = await searchWikipedia(searchQuery);
      if (results.query.searchinfo.totalhits === 0) {
        alert('No results found. Try different keywords');
        return;
      }
  
      displayResults(results);
    } catch (err) {
      console.log(err);
      alert('Failed to search wikipedia');
    } finally {
      spinner.classList.add('hidden');
    }
  }
  
  async function searchWikipedia(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    return json;
  }
  
  function displayResults(results) {
    const searchResults = document.querySelector('.js-search-results');
  
    results.query.search.forEach(result => {
      const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
  
      searchResults.insertAdjacentHTML(
        'beforeend',
        `<div class="result-item">
          <h3 class="result-title">
            <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
          </h3>
          <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
          <span class="result-snippet">${result.snippet}</span><br>
        </div>`
      );
    });
  }
  
  
  const form = document.querySelector('.js-search-form');
  form.addEventListener('submit', handleSubmit);


  