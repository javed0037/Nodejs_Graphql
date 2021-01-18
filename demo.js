let arr1=[
    {
        val:1234,
        text:"abc"
    },

    {
        val:123,
        text:"abc"
    },

    {
        val:12345,
        text:"abc"
    }
]

let arr2=[
    {
        val:123456,
        text:"efd"
    },

    {
        val:123,
        text:"abcefg"
    },

    {
        val:1,
        text:"abclll"
    }
]
let testingStr = ''
arr1.map((item,index)=>{
    if(item.val === arr2[index].val){
         testingStr =item.text + arr2[index].text;
    }

});

console.log(testingStr);