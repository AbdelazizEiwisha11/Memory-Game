/* On Document Ready*/
$(document).ready(()=>{
    $("#loading .spinner").fadeOut(1000, ()=>{
        $('.startBtn').css('display', 'block');
    });
});

/* On Click Start Game Button */
$('.startBtn').click(()=>{
    let yourName = prompt("Enter Your Name?");

    if(yourName == '' || yourName == null){
        $('.name span').html('UnKnown');
    }else{
        $('.name span').html(yourName);
    }

    $("#loading").fadeOut(1000, ()=>{
    $('#loading').remove();
    });
});
let duration = 1000;

/* Get All Blocks From Hmtl */
let blocks = document.querySelector('.blocksContainer');

/* Create Range of Array */
let blocksContainer = Array.from(blocks.children);
let orderRange = [...blocksContainer.keys()];

/*Call Random Orders */
randomNums(orderRange);

/* Add Order Css Property To Game Blocks */
blocksContainer.forEach((block, index)=>{
    /* Add Css Order Property */
    $(block).css('order', `${orderRange[index]}`);

    /* Add Flip class when Block is clicked */
    $(block).click(()=>{
        flipBlock(block);
    })
});

/* Generate Random Numbers Function */
function randomNums(array){
    let curent =array.length,
        temp, 
        random;
    while(curent > 0){
        // Get Random Number
        random = Math.floor(Math.random() * curent);
        // Decrease Length By One
        curent --;
        // [1] Save Current Element in temp
        temp = array[curent];
        // [2] Current Element = Random Element
        array[curent] = array[random];
        // [3] Random Element = Get Element From temp
        array[random] = temp;
    }
    return array;
}

/*To Make Block Flip  */
function flipBlock(selectedBlock){
    /* Add Class isFlipped */
    $(selectedBlock).addClass("isFlipped");

    /* Collect All Flipped Cards */
    let allFlippedBlocks = blocksContainer.filter(flippedBlock => flippedBlock.classList.contains('isFlipped'));

    /* if Theres two Selected Class */
    if(allFlippedBlocks.length === 2 ){
        /*call Function That Stoped Clicking another Blocks */
        StopClicking();
        /*call Function That Checked if Two Blocks Are Mathed */
        checkMatchedBlock(allFlippedBlocks[0], allFlippedBlocks[1])
        /*call Function That Checked if All Blocks Are Matched */
        checkAllAreMatched();
    } 
}
/* Ckeck All Blocks Are Matched  */
function checkAllAreMatched(){
    let allBlocksAreMatched = blocksContainer.filter(hasMatched => hasMatched.classList.contains('hasMathed'));
    if (allBlocksAreMatched.length === 20){
        $('.endGame').css('display','block ')
        /*call Function That Display End Game Div*/
        showEndGame();
    }
}
/* Display End Game Div  */
function showEndGame(){
    setTimeout(()=>{
        $('.endGame').css('display','block ')
    }, duration);
    
    $('.successBtn').click(()=>{
        /* To Make window Reload */
        window.location = window.location;
    });
}

/* Stop Clicking Anthor Blocks  */
function StopClicking(){
    // Add Class No Clicking on Main Container
    blocks.classList.add('noClicking');
    
    setTimeout(() => {
        // Remove Class No Clicking After The Duration
        blocks.classList.remove('noClicking'); 

    }, duration);
}

/* Check If Two Block Are Matched  */
function checkMatchedBlock(firstBlock, secondBlock){

    let triesElement = document.querySelector(".tries span")
    /* If Tow Block Dataset Are Equal */
    if(firstBlock.dataset.tecnology === secondBlock.dataset.tecnology){
        /* Flip two Blocks */
        firstBlock.classList.remove('isFlipped');
        secondBlock.classList.remove('isFlipped');
        /* Add hasMatched Class To fliped Blocks */
        firstBlock.classList.add('hasMathed');
        secondBlock.classList.add('hasMathed');
         /* Play Success Sound */
        document.getElementById("success").play();
    }else{
        /* increse tries +1 */
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            /* Remove isFlipped Class If Tow Block Dataset Are not Equal */
            firstBlock.classList.remove('isFlipped');
            secondBlock.classList.remove('isFlipped'); 
        }, duration);
        /* Play Fail Sound */
        document.getElementById("fail").play();
    }
    
}