const {connect}= require("./connectDB.js");
const Todo = require("./TodoModel.js")

const createTodo =async () => {
try{
await connect();
const todo= await Todo.addTask({
title:"Second Item",
dueDate: new Date(),
completed:false,
});
console.log(`Created todo with Id: ${todo.id}`);
    } 
catch(error){
    console.error(error);
    }
};

const countItems =async ()=>{
    try{
        const totalCount =await Todo.count();
        console.log(`Found ${totalCount} items in the table!`);
    }
    catch(error){
        console.log(error);
    }
}

const getAllTodos= async ()=>{
    try{
        const todos=await Todo.findAll({
            order:[
                ['id','DESC']
            ]
        });
        const todoList =todos.map(todo => todo.displayableString()).join("\n");
        console.log(todoList);
    }catch(error){
        console.log(error);
    }
}
const getSingleTodo= async ()=>{
    try{
        const todos=await Todo.findAll({
            where:{
                completed:false
            },
            order:[
                ['id','DESC']
            ]
        });
        const todoList =todos.map(todo => todo.displayableString()).join("\n");
        console.log(todoList);
    }catch(error){
        console.log(error);
    }
}


const updateItem= async (id)=>{
    try{
        await Todo.update({completed:true},
            {
            where:{
                id:id
            }
        });
    }catch(error){
        console.log(error);
    }
}



(async ()=>{ 
    //await createTodo();
    //await countItems(); 
    await getAllTodos();
    await updateItem(2);
    await getAllTodos();
})();

