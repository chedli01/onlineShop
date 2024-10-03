import {Router} from "express"
import Product from "../mongodb/productSchema.mjs";
import Order from "../mongodb/orderSchema.mjs";
import User from "../mongodb/userSchema.mjs"


const route = Router();

route.get("/categoryChart",async (req,res)=>{
    const products= await Product.find();
    const total=products.length;
    const lapProduct=(((await Product.find({category:"Laptops"})).length)/total)*100;
    const smartProduct=(((await Product.find({category:"Smartphones"})).length)/total)*100;
    const tabProduct=(((await Product.find({category:"Tablets"})).length)/total)*100;
    const telProduct=(((await Product.find({category:"Televisions"})).length)/total)*100;


    res.json({val0:Math.round(lapProduct),val1:Math.round(smartProduct),val2:Math.round(telProduct),val3:Math.round(tabProduct)});


})

route.get("/incomeBars",async(req,res)=>{
    const orders=await Order.find();
    let products=[];
    let lapIncome=0;
    let smartIncome=0;
    let tabIncome=0;
    let telIncome=0;
    await orders.map(async(item)=>{
        await item.productIds.map((ele,index)=>{
            products.push({product:ele,quantity:item.productQuantity[index]})
        })


    })

    // await products.map(async(item)=>{
    //     const result=await Product.findOne({id:item.product});
    //     switch(result.category){
    //         case "Laptops":
    //             lapIncome=lapIncome+(result.price)*(item.quantity);
    //             break;
    //         case "Smartphones":
    //             smartIncome=smartIncome+(result.price)*(item.quantity);
    //             break;
    //         case "Tablets":
    //             tabIncome=tabIncome+(result.price)*(item.quantity);
    //             break;
    //         default:
    //             telIncome=telIncome+(result.price)*(item.quantity);
    //     }



    // })
    for (let item of products) {
        const result = await Product.findOne({ id: item.product });
        switch (result.category) {
          case "Laptops":
            lapIncome += result.price * item.quantity;
            break;
          case "Smartphones":
            smartIncome += result.price * item.quantity;
            break;
          case "Tablets":
            tabIncome += result.price * item.quantity;
            break;
          default:
            telIncome += result.price * item.quantity;
        }
      }
    res.json({lapIncome:lapIncome,smartIncome:smartIncome,tabIncome:tabIncome,telIncome:telIncome})



})

route.get("/userOfTheMounth",async(req,res)=>{
    const occurence=(tab,user)=>{
        let sum=0;
        for(let element of tab){
            if(element==user){sum=sum+1}

        }
    return sum;

    }
    let users=[];
    let frequency=[]
    const orders=await Order.find();
    for(let item of orders){
        users.push(item.userEmail)
    };
    for(let item of users){
        frequency.push({user:item,frequency:occurence(users,item)})
    };
    const sorted=await frequency.sort((a,b)=>b.frequency-a.frequency)
    const email=sorted[0].user;
    const result=User.findOne({email:email})
    let total=0;
    let products=[]
    for(let order of orders){
        if(order.userEmail==email){
            await order.productIds.map((item,index)=>{
                products.push({product:item,quantity:order.productQuantity[index]})
            })

            
        }
    }
    for(let el of products){
        const resu=await Product.findOne({id:el.product});
        total=total+(resu.price)*parseInt(el.quantity)    }
    const username=await User.findOne({email:email})

    res.json({email:email,username:username.username,total:total})
    


})

route.get("/rankProducts",async(req,res)=>{
    let products=[];
    const orders=await Order.find()
    for(let order of orders){
        await order.productIds.map((item,index)=>{
            products.push({id:item,quantity:order.productQuantity[index]})
        })
    }
    const combined = products.reduce((acc,curr)=>{
        const quantity=Number(curr.quantity)
        if(acc[curr.id]){
            acc[curr.id].quantity+=quantity
        }
        else{
            acc[curr.id]={id:curr.id,quantity:quantity}
        }
        return acc


    },{})
    const result =await Object.keys(combined).map(key => combined[key]);
   
    let full=[];
    for(let x of result){
        const product=await Product.findOne({id:x.id})
        full.push({id:x.id,name:product.name,amount:x.quantity*product.price})
    }
    const sorted=full.sort((a,b)=>b.amount-a.amount);
    res.json(sorted)
})

route.get("/total-orders",async(req,res)=>{

    const orders=await Order.find({userEmail:req.cookies.loginCookie.email})
    res.json(orders.length)
})
export default route;

