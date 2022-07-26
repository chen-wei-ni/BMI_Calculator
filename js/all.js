var height = document.querySelector('.height');
var weight = document.querySelector('.weight');
var send = document.querySelector('.result_btn');
var record = document.querySelector('.each_record');
var result = JSON.parse(localStorage.getItem('bmi')) ||[];
var resultBmi = JSON.parse(localStorage.getItem('bmiColored')) ||[];
var resultValue = document.querySelector('.result_value');
var _date = new Date();
var _getDate = (_date.getMonth()+1) +'-'+ _date.getDate()+'-'+_date.getFullYear()
update(result);
send.addEventListener('click',calculate,false);
resultValue.style.display = "none"
//計算BMI
function calculate(){
    var bmiResult = weight.value/(height.value*height.value)*10000;
    var finalResult = bmiResult.toFixed(2); //小數點2位
    console.log(finalResult);
    addData(finalResult);
}

function clearInput(){
    height.value = "";
    weight.value = "";
}
//輸出檔案至localstorage
function addData(e){
    var bmi = {
        content: e,
        weight: weight.value,
        height: height.value,
        time: _getDate
    }
    var bmiColored = {
        bmi: e,
    }
    if(e =='NaN' || height.value=="" || weight.value=="" || e == 0 || e == "Infinity"){return}
    result.push(bmi);
    resultBmi.push(bmiColored);
    submitBmi(resultBmi);
    localStorage.setItem('bmiColored',JSON.stringify(resultBmi));
    update(result);
    localStorage.setItem('bmi',JSON.stringify(result));
    
}
function update(input){
    var str='';
    var len = input.length ;
    for(var i=0;i<len;i++){
        if(input[i].content < 18.5){
            str+= '<div class="box record_light"><div class="row"><p>過輕</p><p><span>BMI</span>'+input[i].content+'</p><p><span>weight</span>'+input[i].weight+'kg</p><p><span>height</span>'+input[i].height+'cm</p><p class="date">'+input[i].time+'</p></div></div>'
        }else if(input[i].content >= 18.5 && input[i].content <24){
            str+= '<div class="box record_normal"><div class="row"><p>理想</p><p><span>BMI</span>'+input[i].content+'</p><p><span>weight</span>'+input[i].weight+'kg</p><p><span>height</span>'+input[i].height+'cm</p><p class="date">'+input[i].time+'</p></div></div>'
        }else if(input[i].content >= 24 && input[i].content < 27){
            str+= '<div class="box record_overweight"><div class="row"><p>過重</p><p><span>BMI</span>'+input[i].content+'</p><p><span>weight</span>'+input[i].weight+'kg</p><p><span>height</span>'+input[i].height+'cm</p><p class="date">'+input[i].time+'</p></div></div>'
        }else if(input[i].content >= 27 && input[i].content < 30){
            str+= '<div class="box record_mild"><div class="row"><p>輕度肥胖</p><p><span>BMI</span>'+input[i].content+'</p><p><span>weight</span>'+input[i].weight+'kg</p><p><span>height</span>'+input[i].height+'cm</p><p class="date">'+input[i].time+'</p></div></div>'
        }else if(input[i].content >=30 && input[i].content < 35){
            str+= '<div class="box record_moderate"><div class="row"><p>中度肥胖</p><p><span>BMI</span>'+input[i].content+'</p><p><span>weight</span>'+input[i].weight+'kg</p><p><span>height</span>'+input[i].height+'cm</p><p class="date">'+input[i].time+'</p></div></div>'
        }else if(input[i].content >= 35){
            str+= '<div class="box record_serve"><div class="row"><p>重度肥胖</p><p><span>BMI</span>'+input[i].content+'</p><p><span>weight</span>'+input[i].weight+'kg</p><p><span>height</span>'+input[i].height+'cm</p><p class="date">'+input[i].time+'</p></div></div>'
        }
    }
    record.innerHTML = str;
    if(result.length > 6){
        result.splice(0,1);
        update(result);
    }    
}
function submitBmi(input){
    send.style.display = "none";
    var bmi='';
    var len = input.length ;
    for(var i=0;i<len;i++){
    if(input[i].bmi < 18.5){
        bmi= '<p data-num="0" class="circle tooLight">'+input[i].bmi+'<span>BMI</span><a class="restart restart_light"></a></p><h4 class="toolight">過輕</h4>';
    }else if(input[i].bmi >= 18.5 && input[i].bmi <24){
        bmi= '<p data-num="1" class="circle normal">'+input[i].bmi+'<span>BMI</span><a class="restart restart_normal"></a></p><h4 class="normal">理想</h4>';

    }else if(input[i].bmi >= 24 && input[i].bmi <27){
        bmi= '<p data-num="2" class="circle overWeight">'+input[i].bmi+'<span>BMI</span><a class="restart restart_over"></a></p><h4 class="overweight">過重</h4>';

    }else if(input[i].bmi >= 27 && input[i].bmi <30){
        bmi= '<p data-num="3" class="circle mildObesity">'+input[i].bmi+'<span>BMI</span><a class="restart restart_mild"></a></p><h4 class="mild">輕度肥胖</h4>';

    }else if(input[i].bmi >= 30 && input[i].bmi <35){
        bmi= '<p data-num="4" class="circle moderateObesity">'+input[i].bmi+'<span>BMI</span><a class="restart restart_moderate"></a></p><h4 class="moderate">中度肥胖</h4>';
    }else if(input[i].bmi >= 35 ){
        bmi= '<p data-num="5" class="circle severeObesity">'+input[i].bmi+'<span>BMI</span><a class="restart restart_sever"></a></p><h4 class="sever">重度肥胖</h4>';
    }
}    
    resultValue.style.display = "inline-block";
    resultValue.innerHTML = bmi;
    jumpInto(resultValue);
}

var blackArea = document.querySelector('.inputArea');
function deleteData(e){
    e.preventDefault();
    console.log(e.target.nodeName)
    if(e.target.nodeName !== 'A'){return};
    resultBmi.splice(0);
    submitBmi(resultBmi);
    update(result);
    clearInput();
    send.style.display = "block";
    resultValue.style.display = "none";
}
blackArea.addEventListener('click',deleteData);


function jumpInto(e){
anime({
    targets: e,
    rotate: [50,0],
    scale: [0,1],
    opacity: [0,1],
    delay: 200,
    duration: 2000,
})
}
