const smallRadius = 10
const bigRadius = 20

function showSidebar(){
    const sidebar = document.querySelector('.news-left-bar')
    sidebar.style.display = 'flex'

    const closeMenu = document.querySelector('.close-menu')
    closeMenu.style.display = 'flex'
}

function hideSidebar(){
    const sidebar = document.querySelector('.news-left-bar')
    sidebar.style.display = 'none'

    const closeMenu = document.querySelector('.close-menu')
    closeMenu.style.display = 'none'
}

function handleWindowResize() {
    var reswidth = screen.width;
    const sidebar = document.querySelector('.news-left-bar')


    if (reswidth < 450) {
        sidebar.style.display = 'none'

        const closeMenu = document.querySelector('.close-menu')
        if( closeMenu.style.display == 'flex'){
            hideSidebar()
        }

    } else {
        sidebar.style.display = 'flex'
    }

    
}

function swapElements(){
    
    const container = document.querySelector('.container')
    const findLeftBar = document.querySelector('.find-left-bar')
    const pseudoElementContainer = document.getElementById('right-bar')
    if(container.style.flexDirection == 'row-reverse'){
        container.style.flexDirection = 'row'
        pseudoElementContainer.style.setProperty('--visible', 'none');
        findLeftBar.style.display =  'flex'
    }else{
        container.style.flexDirection = 'row-reverse' 
        findLeftBar.style.display = 'none'
        pseudoElementContainer.style.setProperty('--visible', 'flex');
    }
}

function calculateSquareOfOval(smallRadius, bigRadius){
    return smallRadius * bigRadius * Math.PI
}

function calculateNumberOfWords(str){
    const wordsArray = str.split(" "); // Splits the string at each space
    const numberOfWords = wordsArray.length;

    return numberOfWords; // Output will depend on the number of words in the string
}

function getCook(cookiename) 
{
  // Get name followed by anything except a semicolon
  var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

function showNumberOfWords(){
    const sidebar = document.querySelector('.text-calculator')
    sidebar.style.display = 'flex'
}

// Initial check when the page loads
handleWindowResize()




const mainCenterBar = document.querySelector('.main-center-bar')
const squareOfOvalDiv = document.createElement('div')

let squareOfOval = calculateSquareOfOval(smallRadius, bigRadius)
console.log(squareOfOval)
squareOfOvalDiv.textContent = 'Площа стандартної овальної упаковки морозива: '+ squareOfOval

mainCenterBar.appendChild(squareOfOvalDiv)

// Add an event listener to check for window resize
window.addEventListener('resize', handleWindowResize)

const submitTextButton = document.querySelector("#textSubmition")
const message = document.querySelector("#message")
submitTextButton.addEventListener("submit", (event) => {
    event.preventDefault()
    let numberOfWords = calculateNumberOfWords(message.value)
    document.cookie = 'words=' + numberOfWords.toString() + ' ;expires=' + new Date(2024, 0, 1).toUTCString()
    window.alert(numberOfWords)
});



window.addEventListener('load', function() {
    let tmpCookie = getCook('words')
    if(tmpCookie != ''){
        
        if (window.confirm("Delete cookies?" +  " Number of words are " + tmpCookie)) {
            document.cookie = 'words' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/ex5/src/html;';
            location.reload();
        } else{
            window.alert(" Number of words are " + tmpCookie + ". Please reload page!")
        }
    }else{
        showNumberOfWords()
    }
});



window.addEventListener("dblclick", (event) => {
    let thirdBlock = document.querySelector('#thirdBlock')
    let fourthBlock = document.querySelector('#fourthBlock')
    let fifthBlock = document.querySelector('#fifthBlock')

    let thirdBlockValue = thirdBlock.checked 
    let fourthBlockValue = fourthBlock.checked 
    let fifthBlockValue = fifthBlock.checked 
    
    localStorage.setItem('thirdBlock', thirdBlockValue)
    localStorage.setItem('fourthBlock', fourthBlockValue)
    localStorage.setItem('fifthBlock', fifthBlockValue)
    location.reload();
    
});

let thirdBlockValue = localStorage.getItem('thirdBlock')
let fourthBlockValue = localStorage.getItem('fourthBlock')
let fifthBlockValue = localStorage.getItem('fifthBlock')

if(thirdBlockValue == 'true'){
    const centerBlock = document.querySelector('.main-center-bar')
    centerBlock.style.alignItems = 'flex-start'
}

if(fourthBlockValue == 'true'){
    const rightBlock = document.querySelector('.right-bar')
    rightBlock.style.justifyContent = 'flex-start'

    const listContent  = document.querySelector('.list-content')
    listContent.style.textAlign = 'left'
}

if(fifthBlockValue == 'true'){
    const leftBlock = document.querySelector('.news-left-bar')
    leftBlock.style.justifyContent = 'flex-start'

    const buttons  = document.querySelectorAll('.button ')
    buttons.forEach(button => {
    button.style.textAlign = 'left'
    });
    
}

const listOfMainBlockNames = [".header", ".find-left-bar", ".main-center-bar", ".right-bar", ".news-left-bar", ".bottom-center-bar" , ".footer-bar"]

const listOfSelectBlockNames = ["#choose-block-1", "#choose-block-2", "#choose-block-3", "#choose-block-4", "#choose-block-5", "#choose-block-6" , "#choose-block-7"]

const htmlContent = `
    <div class="code-adder">
        <form id="codeSubmition">
            <label>Enter code:</label>
            <textarea id="codeText" rows="20" cols="100"></textarea>
            <input type="submit" value="Submit Code">
        </form>
    </div>`;

const deleteButton = `<form class="delete-button">
                <input type="submit" value="Delete changes">
            </form>`
            
function createDeleteButton(number){
    return `<form class="delete-button` + number +`">
                <input type="submit" value="Delete changes">
            </form>`
}


let previousNumber
for (let i = 0; i < listOfSelectBlockNames.length; i++) {
    let newHTML = localStorage.getItem(listOfMainBlockNames[i])

    const block = document.querySelector(listOfMainBlockNames[i])
    const blockValue = block.innerHTML

    let nameOfOriginalBlock = listOfMainBlockNames[i] + 'Original'
    if(!localStorage.getItem(nameOfOriginalBlock)){
        localStorage.setItem(nameOfOriginalBlock, blockValue)
    }

    if(newHTML){
        block.innerHTML = newHTML + createDeleteButton(i)
        block.style.fontStyle = "italic"
    }

    let nameOfdeleteBlock = '.delete-button' + i
    const deleteBlock = document.querySelector(nameOfdeleteBlock)
    if(deleteBlock){
    deleteBlock.addEventListener('click', (event)=>{
        event.preventDefault()
        if(newHTML){
            localStorage.removeItem(listOfMainBlockNames[i])
            let nameOfOriginalBlock = listOfMainBlockNames[i] + 'Original'
            block.innerHTML = localStorage.getItem(nameOfOriginalBlock)
            block.style.fontStyle = "normal"
        }
    })
    }

    const chooseBlock = document.querySelector(listOfSelectBlockNames[i])
    chooseBlock.addEventListener("select", (event)=>{
        event.preventDefault()
        previousNumber = i
        const codeAdderElement = document.querySelector('.code-adder');
        if (codeAdderElement) {
            codeAdderElement.remove();
        }
        
        block.innerHTML += htmlContent
        
        const codeText = document.querySelector('#codeText');
        codeText.value = blockValue

        codeText.addEventListener("change", (event) => {
            event.preventDefault()
            let changed = true 
        })

        const codeSubmition = document.querySelector('#codeSubmition');
        codeSubmition.addEventListener('submit', (event)=>{
            localStorage.setItem(listOfMainBlockNames[i], codeText.value )
        })

    })
}





// const submitCodeButton = document.querySelector("#codeSubmition")
// const code = document.querySelector("#codeText")
// submitCodeButton.addEventListener("submit", (event) => {
//     event.preventDefault()
//      const centerBlock = document.querySelector('.main-center-bar')
//      centerBlock.innerHTML += code.value
// });


