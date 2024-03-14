//get input value
const colorPicker = document.getElementById("color-picker")
//select color Scheme
const colorSchemeSelect = document.getElementById("color-scheme-select")
//take button click and fire functions
const generateBtn = document.getElementById("generate-btn")


document.addEventListener("click", function(e){
    if(e.target.classList.contains("generate-btn")){
        getColorScheme()
    }else if(e.target.classList.contains("color-hex")){
        copyToClipboard(e.target.innerText)
    }
})

function getColorScheme(){
    const colorSeedHex = colorPicker.value
    const colorScheme = colorSchemeSelect.value
    const colorSeedClean = colorSeedHex.substring(1)
    
    //GET colors array from color API
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorSeedClean}&mode=${colorScheme}&count=5`)
        .then(res => res.json())
        .then(data => {
            const colorArray = data.colors
            const colorContainer = document.getElementById("color-container")
            let colorHtml = ""
            for(let color of colorArray){
                
                //display hex values in html
                const colorHexVal = color.hex.value
                const colorHexClean = color.hex.clean
                const colorName = color.name.value
                const colorRGB = {r: color.rgb.r, g: color.rgb.g, b: color.rgb.b}
                console.log(colorRGB)
                //  Calculate the brightness of the color
                const brightness = calculateBrightness(colorRGB)
                //Determine the text color based on brightness
                const textColor = brightness > 128 ? 'black' : 'white'
                
                 function calculateBrightness(rgb) {
                        const { r, g, b } = rgb
                        return (r * 299 + g * 587 + b * 114) / 1000
                    }
             
                colorHtml += ` 
                <div class="color" style="background-color:${colorHexVal}">
                <p class="color-hex" style="color:${textColor}">${colorHexClean}</p>
                <p class="color-name" style="color:${textColor}">${colorName}</p>
                </div>
                `
            }
            colorContainer.innerHTML = colorHtml
        }) 
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
  alert("Copied!")
}




