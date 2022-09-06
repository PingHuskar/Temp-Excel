const tableStyle = "border-2 border-primary-500 hover:text-white hover:font-black hover:bg-black font-black"
var customText = `Lorem Iheretoo Iherepomnalika`
const randomIntFromInterval = (min, max) => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const addItem = () => {
    try {
        var len = (document.getElementById("mainTable").innerHTML.match(/<tr>/g)).length
        // console.log("try")
    }
    catch(e) {
        // console.log(e)
        var len = 0
    }
    document.getElementById("mainTable").innerHTML += `
<tr><td class='${tableStyle} text-center' contenteditable="false">${len+1}</td>
  <td class='${tableStyle} text-left'>${customText}</td>
  <td class='${tableStyle} text-center area'>${randomIntFromInterval(1,10)}</td>
  <td class='${tableStyle} text-center pricePerArea'>${randomIntFromInterval(1,10)}</td>
  <td class='${tableStyle} text-center plus'></td>
  <td class='${tableStyle} text-center minus'></td>
  <td class='${tableStyle} text-center divide'></td>
  <td class='${tableStyle} text-center subtotal' contentEditable="false"></td>
</tr>
`
    main()
}

const removeItem = () => {
    const temp = document.getElementById("mainTable").innerHTML.split(`<tr><td class="${tableStyle} text-center" contenteditable="false">${(document.getElementById("mainTable").innerHTML.match(/<tr>/g)).length}</td>`)[0]
    document.getElementById("mainTable").innerHTML = temp
    main()
}

document.getElementById("mainTable").innerHTML = `
<tr><td class='${tableStyle} text-center' contenteditable="false">1</td>
  <td class='${tableStyle} text-left'>${customText}</td>
  <td class='${tableStyle} text-center area'>${randomIntFromInterval(1,10)}</td>
  <td class='${tableStyle} text-center pricePerArea'>${randomIntFromInterval(1,10)}</td>
  <td class='${tableStyle} text-center plus'></td>
  <td class='${tableStyle} text-center minus'></td>
  <td class='${tableStyle} text-center divide'></td>
  <td class='${tableStyle} text-center subtotal' contentEditable="false"></td>
</tr>
`
// alert((document.getElementById("mainTable").innerHTML.match(/<tr>/g)).length)


const main = () => {
    const unit1 = `th-TH`
    const unit2 = { style: "currency", currency: "THB" }
    const s = document.getElementsByClassName('subtotal')
    const area = document.getElementsByClassName('area')
    const plus = document.getElementsByClassName('plus')
    const minus = document.getElementsByClassName('minus')
    const divide = document.getElementsByClassName('divide')
    
    const pricePerArea = document.getElementsByClassName('pricePerArea')
    var cf = 0
    var cfDivide = 0
    var cfMinus = 0
    var cfPlus = 0
    var cfX = 0
    var cfY = 0
    for (let item = 0; item < s.length; item++) {
      var newX = area[item].innerText.replace(/\D/g, "") || 0
      var newY = pricePerArea[item].innerText.replace(/\D/g, "") || 0
      s[item].innerText = parseInt(newX) * parseInt(newY)
      plus[item].innerText = parseInt(newX) + parseInt(newY)
      cfPlus += parseInt(newX) + parseInt(newY)
      minus[item].innerText = parseInt(newX) - parseInt(newY)
      cfMinus = parseInt(newX) - parseInt(newY)
      divide[item].innerText = parseInt(newX) / parseInt(newY)
      var newText = s[item].innerText.replace(/\D/g, "")
    //   console.log(newText)
      cf += parseInt(newText)
      cfX += parseInt(newX)
      cfY += parseInt(newY)
      cfDivide += parseFloat(parseInt(newX) / parseInt(newY))
      s[item].innerText = `${parseInt(newText).toLocaleString(unit1,unit2)}`
      area[item].innerText = parseInt(newX).toLocaleString()
      pricePerArea[item].innerText = parseInt(newY).toLocaleString()
    }
    document.getElementById('subtotalX').innerText = `${cfX.toLocaleString(unit1,unit2)}`
    document.getElementById('subtotalY').innerText = `${cfY.toLocaleString(unit1,unit2)}`
    document.getElementById('subtotalPlus').innerText = `${cfPlus.toLocaleString(unit1,unit2)}`
    document.getElementById('subtotalMinus').innerText = `${cfMinus.toLocaleString(unit1,unit2)}`
    document.getElementById('subtotalDivide').innerText = `${cfDivide.toLocaleString(unit1,unit2)}`
    document.getElementById('subtotal').innerText = `${cf.toLocaleString(unit1,unit2)}`
}
main()