var nameEl = document.getElementById('introduce-address');

var first = []; /* 省，直辖市 */
var second = []; /* 市 */
var third = []; /* 镇 */

var selectedIndex = [0, 0, 0]; /* 默认选中的地区 */

var checked = [0, 0, 0]; /* 已选选项 */

function creatList(obj, list){
  var i =0;
  for(var key in obj){
    i++;
    var temp = {};
    temp.text = obj[key];
    temp.value = i;
    temp.code = key;
    list.push(temp);
  }
}

creatList(ChineseDistricts[1e5], first);
creatList(ChineseDistricts[11e4], second);
creatList(ChineseDistricts[110100], third);

var picker = new Picker({
  data: [first, second, third],
  selectedIndex: selectedIndex,
  title: '地址选择'
});

picker.on('picker.select', function (selectedVal, selectedIndex) {
  var text1 = first[selectedIndex[0]].text;
  var text2 = second[selectedIndex[1]].text;
  var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';
  var code1 = first[selectedIndex[0]].code;
  var code2 = second[selectedIndex[1]].code;
  var code3 = third[selectedIndex[2]] ? third[selectedIndex[2]].code : '';

  nameEl.innerText = text1 + ' ' + text2 + ' ' + text3;
  code = code1 + ' ' + code2 + ' ' + code3;
 // console.log(code);
  $("#province").val(code1);
  $("#city").val(code2);
  $("#district").val(code3)
});

picker.on('picker.change', function (index, selectedIndex) {
  if (index === 0){
    firstChange();
  } else if (index === 1) {
    secondChange();
  }

  function firstChange() {
    second = [];
    third = [];
    checked[0] = selectedIndex;
    var a = first[selectedIndex].code;
    if(ChineseDistricts.hasOwnProperty(a)){
      creatList(ChineseDistricts[a], second);
      if(ChineseDistricts.hasOwnProperty(second[0].code)){
        creatList(ChineseDistricts[second[0].code], third);
      }
    }
    picker.refillColumn(1, second);
    picker.refillColumn(2, third);
    picker.scrollColumn(1, 0);
    picker.scrollColumn(2, 0)
  }
  function secondChange() {
    third = [];
    checked[1] = selectedIndex;
    var a = second[selectedIndex].code;
    if (ChineseDistricts.hasOwnProperty(a)) {
      creatList(ChineseDistricts[a], third);
      picker.refillColumn(2, third);
      picker.scrollColumn(2, 0)
    } else {
      third = [{text: '', value: 0}];
      checked[2] = 0;
      picker.refillColumn(2, third);
      picker.scrollColumn(2, 0)
    }
  }
});

picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
  console.log(selectedVal);
  console.log(selectedIndex);
});

nameEl.addEventListener('click', function () {
  picker.show();
});



